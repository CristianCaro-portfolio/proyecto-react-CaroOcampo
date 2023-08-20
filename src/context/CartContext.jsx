import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export function CartProvider ({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});

  const addToCart = (itemToAdd) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((character) => character.id === itemToAdd.id);
  
    if (existingItem) {
      // If the item already exists, update its quantity
      setCartItems((prevCartItems) =>
        prevCartItems.map((character) =>
          character.id === itemToAdd.id ? { ...character, quantity: character.quantity + 1 } : character
        )
      );
    } else {
      // If the item doesn't exist, add it to the cart
      setCartItems((prevCartItems) => [...prevCartItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemIdToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((character) => character.id !== itemIdToRemove)
    );
  };

  const calculateTotal = (items) => {
    return items.reduce((total, character) => total + character.price * character.quantity, 0);
  };

  const createOrder = async () => {
    try {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      const newOrder = {
        items: cartItems.map((character) => ({
          id: character.id,
          quantity: character.quantity,
        })),
        total: calculateTotal(cartItems),
        timestamp: serverTimestamp(),
        customerName: orderInfo.name,
      };

      await addDoc(ordersCollection, newOrder);

      console.log('Orden guardada en Firestore');
      setCartItems([]);
      setOrderInfo({});
    } catch (error) {
      console.error('Error al guardar la orden en Firestore:', error);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    calculateTotal,
    orderInfo,
    setOrderInfo,
    createOrder,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
