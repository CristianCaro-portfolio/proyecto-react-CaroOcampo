import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacters } from './mockData';
import './ItemListContainer.css';

function ItemListContainer() {
  const { id } = useParams();
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharactersByCategory() {
      try {
        const characters = await fetchCharacters();
        const filteredCharactersByCategory = characters.filter(
          (character) => character.species.toLowerCase() === id.toLowerCase()
        );
        setFilteredCharacters(filteredCharactersByCategory);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }
    fetchCharactersByCategory();
  }, [id]);

  return (
    <div>
      {filteredCharacters.map((character) => (
        <div key={character.id} className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemListContainer;
