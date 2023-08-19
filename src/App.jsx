import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './context/NavBar';
import ItemListContainer from './context/ItemListContainer';
import ItemDetailContainer from './context/ItemDetailContainer';
import Checkout from './context/Checkout';
import CartWidget from './context/CartWidget';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import functions from Firestore
import { initializeApp } from 'firebase/app';
import './app.css';
import { CartProvider } from './context/CartContext'; // Importa el CartProvider
import { useCartContext } from './context/CartContext';
import config from './../config';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

initializeApp(firebaseConfig);

function App() {
  const [total, setTotal] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Estado para los elementos en el carrito

  useEffect(() => {
    // Función para obtener datos desde Firestore
    async function fetchCharactersFromFirestore() {
      try {
        const db = getFirestore();
        const charactersCollection = collection(db, 'products');
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
  const addToCart = (itemToAdd) => {
    // El estado del CartContext ya está inicializado
    const { cartItems } = useCartContext();
  
    // Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.id === itemToAdd.id);
  
    if (existingItem) {
      // If the item already exists, update its quantity
      cartItems = cartItems.map((item) =>
        item.id === itemToAdd.id ? ({ ...item, quantity: item.quantity + 1 }) : item
      );
    } else {
      // If the item doesn't exist, add it to the cart
      cartItems = [...cartItems, ({ ...itemToAdd, quantity: 1 })];
    }
  };


  return (
    
    <Router>
      <div>  
        <CartProvider>
          <NavBar cartItemCount={cartItems.length} /> 
          <Routes>
            {/* Pass the 'characters' data as a prop to the components */}
            <Route path="/" element={<ItemListContainer characters={characters} addToCart={addToCart} />} />
            <Route path="/category/:id" element={<ItemListContainer characters={characters} addToCart={addToCart} />} />
            <Route path="/item/:id" element={<ItemDetailContainer characters={characters} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout total={total}/>}/> {/* Take the items from the cart and the total as prop */}
          </Routes>
        </CartProvider>  
      </div>
    </Router>
  );
}

export default App;
