// mockData.js
import axios from 'axios';

export async function fetchCharacters() {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  const data = response.data.results.map(character => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image, // Agrega el campo para la URL de la imagen
  }));
  return data;
}
