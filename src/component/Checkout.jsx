import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Checkout({ cartItems }) {
  const [name, setName] = useState('');

  // Calcula el precio total
  const total = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  const handlePurchase = async () => {
    try {
      // Crear una nueva orden en Firestore
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      const newOrder = {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        total: total,
        timestamp: serverTimestamp(),
        customerName: name,
      };

      // Agregar la nueva orden a la colección "orders"
      await addDoc(ordersCollection, newOrder);

      console.log('Orden guardada en Firestore');
    } catch (error) {
      console.error('Error al guardar la orden en Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <form>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handlePurchase}>Realizar compra</button>
      </form>
    </div>
  );
}

export default Checkout;
