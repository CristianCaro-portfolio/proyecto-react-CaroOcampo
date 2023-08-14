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
  const [cartItemCount, setCartItemCount] = useState(0); // new state for count ítems in carwidget

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

  return (
    <Router>
      <div>
        <NavBar cartItemCount={cartItemCount} /> 
        <Routes>
          {/* Pass the 'characters' data as a prop to the components */}
          <Route path="/" element={<ItemListContainer characters={characters} />} />
          <Route path="/category/:id" element={<ItemListContainer characters={characters} />} />
          <Route path="/item/:id" element={<ItemDetailContainer characters={characters} />} />
          <Route path="/checkout" element={<Checkout cartItems={[]} total={0}/>}/> {/*take the items from the carwidget and the total as prop*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;