import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import functions Firestore

function Checkout({ cartItems, total }) {
  const [name, setName] = useState('');

  const handlePurchase = async () => {
    try {
      // Crear una nueva orden en Firestore
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      // Datos de la nueva orden
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
      const docRef = await addDoc(ordersCollection, newOrder);

      console.log('Orden guardada en Firestore con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar la orden en Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {/* Mostrar elementos en el carrito */}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
      {/* Mostrar el total */}
      <p>Total: ${total}</p>
      {/* Formulario para ingresar información del cliente */}
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
