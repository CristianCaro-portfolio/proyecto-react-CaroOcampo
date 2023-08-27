import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemlistcontainer.css';
import { useCartContext } from './CartContext';

function ItemListContainer({ characters }) {
  const { id } = useParams();
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    // filter characters by especie (if exist)
    if (id && characters) {
      const filteredCharactersByCategory = characters.filter(
        (character) => character.category && character.category.toLowerCase() === id.toLowerCase()
      );
      setFilteredCharacters(filteredCharactersByCategory);
    }
  }, [id, characters]);

  // Rendering characters list  filtered or image in the main page
  return (
    <div className="item-list-container">
      {filteredCharacters.length === 0 ? (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/e-commerce-finalproject-7c55f.appspot.com/o/main_banner.jpg?alt=media&token=ad7b2045-5287-4120-9d55-497b5e0f31f2"
          alt="Main Banner"
          className="main-banner"
        />
      ) : (
        // show characters filteres
        filteredCharacters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character['img-url']} alt={character.name} className="character-image" />
            <h3>{character.name}</h3>
            <p>Price: {character.price}</p>
            {/* button add to the cart */}
            <button onClick={() => addToCart(character)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemListContainer;
