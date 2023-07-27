import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import ItemListContainer from './component/ItemListContainer';
import ItemDetailContainer from './component/ItemDetailContainer';
import { fetchCharacters } from './component/mockData';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch characters from the API and update the state
    async function fetchCharactersData() {
      try {
        const charactersData = await fetchCharacters();
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }
    fetchCharactersData();
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Pass the 'characters' data as a prop to the components */}
          <Route path="/" element={<ItemListContainer characters={characters} />} />
          <Route path="/category/:id" element={<ItemListContainer characters={characters} />} />
          <Route path="/item/:id" element={<ItemDetailContainer characters={characters} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
