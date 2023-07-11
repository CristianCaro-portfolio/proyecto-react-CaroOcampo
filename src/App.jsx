import React from 'react';
import NavBar from './component/NavBar';
import ItemListContainer from './component/ItemListContainer';

function App() {
  return (
    <div>
      <NavBar />
      <ItemListContainer greeting="¡Bienvenido/a a nuestra tienda!" />
    </div>
  );
}

export default App;
