import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailContainer({ characters }) {
  const { id } = useParams();

  // Filtrar los personajes según la especie seleccionada (si existe)
  const filteredCharacters = characters.filter(
    (character) => character.species.toLowerCase() === id.toLowerCase()
  );

  return (
    <div>
      {/* Mostrar un mensaje si no hay personajes para la especie seleccionada */}
      {filteredCharacters.length === 0 ? (
        <p>No hay personajes disponibles para esta especie.</p>
      ) : (
        // Mostrar los personajes filtrados según la especie
        filteredCharacters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            {/* Agrega más información de los personajes si lo deseas */}
          </div>
        ))
      )}
    </div>
  );
}

export default ItemDetailContainer;
