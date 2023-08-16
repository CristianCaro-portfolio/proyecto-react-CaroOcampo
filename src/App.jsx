import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import ItemListContainer from './component/ItemListContainer';
import ItemDetailContainer from './component/ItemDetailContainer';
import Checkout from './component/Checkout';
import CartWidget from './component/CartWidget';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import functions from Firestore
import { initializeApp } from 'firebase/app';
import './app.css';

const firebaseConfig = {
  apiKey: "AIzaSyBcAyV-8yR6AyDI260jVT01l-MmdDWAdCA",
  authDomain: "e-commerce-finalproject-7c55f.firebaseapp.com",
  projectId: "e-commerce-finalproject-7c55f",
  storageBucket: "e-commerce-finalproject-7c55f.appspot.com",
  messagingSenderId: "43076129063",
  appId: "1:43076129063:web:c2339850090164e85a1902",
  measurementId: "G-Q37ELLYY73"
};

initializeApp(firebaseConfig);

function App() {
  const [characters, setCharacters] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Estado para los elementos en el carrito

  useEffect(() => {
    // Función para obtener datos desde Firestore
    async function fetchCharactersFromFirestore() {
      try {
        const db = getFirestore();
        const charactersCollection = collection(db, 'products'); // Cambiar por el nombre de tu colección
        const charactersSnapshot = await getDocs(charactersCollection);
        const charactersData = charactersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters from Firestore:', error);
      }
    }

    fetchCharactersFromFirestore();
  }, []);

  // Función para agregar un elemento al carrito
  const addToCart = (item) => {
    // Verificar si el elemento ya está en el carrito
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Si ya existe, incrementar la cantidad
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      // Si no existe, agregar como nuevo elemento al carrito
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div>
        <NavBar cartItemCount={cartItems.length} /> 
        <Routes>
          {/* Pass the 'characters' data as a prop to the components */}
          <Route path="/" element={<ItemListContainer characters={characters} addToCart={addToCart} />} />
          <Route path="/category/:id" element={<ItemListContainer characters={characters} addToCart={addToCart} />} />
          <Route path="/item/:id" element={<ItemDetailContainer characters={characters} addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />}/> {/* Take the items from the cart and the total as prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
