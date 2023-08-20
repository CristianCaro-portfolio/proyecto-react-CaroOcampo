import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCartContext } from './CartContext';

function Checkout() {
  const { cartItems, calculateTotal, orderInfo, setOrderInfo, createOrder } = useCartContext();
  const [name, setName] = useState('');
  console.log(cartItems);
  console.log(calculateTotal(cartItems));
  
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
        items: cartItems.map((character) => ({
          id: character.id,
          quantity: character.quantity,
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
        {cartItems.map((character) => (
          <li key={character.id}>
            {character.name} - Cantidad: {character.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal(cartItems).toFixed(2)}</p>
      <form>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={createOrder}>Realizar compra</button>
      </form>
    </div>
  );
}

export default Checkout;
