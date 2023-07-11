import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css'; // Importa el archivo de estilos personalizados

function NavBar() {
  return (
    <nav className="navbar">
      <h3 className="navbar-brand">MI E-COMMERCE</h3>
      <div className="navbar-items">
        <button className="btn btn-primary">Hombre</button>
        <button className="btn btn-primary">Mujer</button>
        <button className="btn btn-primary">Unisex</button>
      </div>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
