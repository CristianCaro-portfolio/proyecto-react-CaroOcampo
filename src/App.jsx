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
import { CartProvider } from './context/CartContext'; // Import CartProvider
//In case env fails, use import config and the next firebaseConfig
//import config from './../config';

// const firebaseConfig = {
//   apiKey: config.apiKey,
//   authDomain: config.authDomain,
//   projectId: config.projectId,
//   storageBucket: config.storageBucket,
//   messagingSenderId: config.messagingSenderId,
//   appId: config.appId,
//   measurementId: config.measurementId
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

function App() {
  const [total, setTotal] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [cartItems, setCartItems] = useState([]); // status for elements in car

  useEffect(() => {
    // obtain data from Firestore
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

  return (
    
    <Router>
      <div>  
        <CartProvider>
          <NavBar cartItemCount={cartItems.length} /> 
          <Routes>
            {/* Pass the 'characters' data as a prop to the components */}
            <Route path="/" element={<ItemListContainer characters={characters} />} />
            <Route path="/category/:id" element={<ItemListContainer characters={characters} />} />
            <Route path="/character/:id" element={<ItemDetailContainer characters={characters} />} />
            <Route path="/checkout" element={<Checkout total={total}/>}/> {/* Take the items from the cart and the total as prop */}
          </Routes>
        </CartProvider>  
      </div>
    </Router>
  );
}

export default App;
