import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCartContext } from './CartContext';

function Checkout() {
  const { cartItems, calculateTotal, createOrder } = useCartContext();
  const [name, setName] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePurchase = async () => {
    if (!name) {
      alert('Por favor, ingresa tu nombre antes de realizar la compra.');
      return;
    }

    try {
      await createOrder(name);
      setIsOrderPlaced(true);
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
      {isOrderPlaced ? (
        <p>¡Orden realizada exitosamente!</p>
      ) : (
        <form>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={handlePurchase}>Realizar compra</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
 