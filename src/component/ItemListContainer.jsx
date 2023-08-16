import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemlistcontainer.css';

function ItemListContainer({ characters, addToCart }) {
  const { id } = useParams();
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    // Filtrar personajes según la especie seleccionada (si existe)
    if (id && characters) {
      const filteredCharactersByCategory = characters.filter(
        (character) => character.category && character.category.toLowerCase() === id.toLowerCase()
      );
      setFilteredCharacters(filteredCharactersByCategory);
    }
  }, [id, characters]);

  // Renderizar la lista de personajes filtrados o la imagen en la página principal
  return (
    <div className="item-list-container">
      {/* Mostrar los personajes filtrados */}
      {filteredCharacters.map((character) => (
        <div key={character.id} className="character-card">
          <img src={character['img-url']} alt={character.name} className="character-image" />
          <h3>{character.name}</h3>
          <p>Price: {character.price}</p>
          {/* Botón para agregar al carrito */}
          <button onClick={() => addToCart(character)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ItemListContainer;
