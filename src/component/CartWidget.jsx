import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './CartWidget.css'; // Importa el archivo de estilos personalizados

// Agrega el icono del carrito a la biblioteca de iconos
library.add(faShoppingCart);

function CartWidget({ cartItemCount }) {
  return (
    <div>
      <Link to="/checkout"> {/* Enlace a la página de Checkout */}
        <FontAwesomeIcon icon="shopping-cart" />
        {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>} {/* Mostrar la cantidad de elementos en el carrito */}
      </Link>
    </div>
  );
}

export default CartWidget;
