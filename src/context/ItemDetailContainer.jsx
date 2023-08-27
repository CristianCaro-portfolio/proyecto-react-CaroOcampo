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
        // show character details filtered
        filteredCharacters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            {/* button to add in the cart */}
            <button onClick={() => addToCart(character)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemDetailContainer;
