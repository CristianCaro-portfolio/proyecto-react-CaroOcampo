import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        MI E-COMMERCE
      </Link>
      <div className="navbar-items">
        <Link to="/category/Alien" className="btn btn-primary">
          Alien
        </Link>
        <Link to="/category/Human" className="btn btn-primary">
          Human
        </Link>
      </div>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
