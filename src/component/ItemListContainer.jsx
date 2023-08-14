import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemlistcontainer.css';

function ItemListContainer({ characters }) {
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
      {id ? (
        // Mostrar los personajes filtrados cuando se haya seleccionado una categoría (Aliens o Humans)
        filteredCharacters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character['img-url']} alt={character.name} className="character-image" />
            <h3>{character.name}</h3>
            <p>Price: {character.price}</p>
          </div>
        ))
      ) : (
        // Mostrar la imagen en la página principal cuando no se haya seleccionado una categoría
        <div className="banner-container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-finalproject-7c55f.appspot.com/o/main_banner.jpg?alt=media&token=dabad065-b3b8-426e-b332-20cc18b9a723"
            alt="Main Banner"
            className="main-banner"
          />
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;
