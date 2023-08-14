import axios from 'axios';
import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import functions Firestore

function Checkout({ cartItems, total }) {
  const [name, setName] = useState('');

  const handlePurchase = async () => {
    try {
      // create a new orderin  Firestore
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      // data from new order
      const newOrder = {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        total: total,
      };

      // Agregar la nueva orden a la colección "orders"
      const docRef = await addDoc(ordersCollection, newOrder);

      console.log('Order saved in Firestore with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving order in Firestore:', error);
    }
  };

  // Logic for make the purchase and save the order in the data base

  return (
    <div>
      <h2>Checkout</h2>
      {/* show items in the cartwidget */}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      {/* show total order */}
      <p>Total: ${total}</p>
      {/* form to ingest information from client */}
      <form>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handlePurchase}>Make purchase</button>
      </form>
    </div>
  );
}

export default Checkout;
