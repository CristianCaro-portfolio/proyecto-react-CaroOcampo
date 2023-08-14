import React from 'react';
import './ItemCard.css';

function ItemCard({ character, onAddToCart }) {
  const { id, name, image, price } = character;

  const handleAddToCart = () => {
    // call the function made by parent component to add the product to cart
    onAddToCart(character);
  };

  return (
    <div className="item-card">
      <img src={image} alt={name} className="item-image" />
      <h3>{name}</h3>
      <p>Precio: {price}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ItemCard;
