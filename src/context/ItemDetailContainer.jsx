import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailContainer({ characters }) {
  const { id } = useParams();

  // filter characters by specie selected if exist.
  const filteredCharacters = characters.filter(
    (character) => character.species.toLowerCase() === id.toLowerCase()
  );

  return (
    <div>
      {filteredCharacters.length === 0 ? (
        <p>there are not character available for this specie.</p>
      ) : (
        // Mostrar detalles del personaje filtrado
        filteredCharacters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            {/* Botón para agregar al carrito */}
            <button onClick={() => addToCart(character)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemDetailContainer;
