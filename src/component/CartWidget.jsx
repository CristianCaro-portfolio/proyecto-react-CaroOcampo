import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './CartWidget.css'; // Importa el archivo de estilos personalizados

// Agrega el icono del carrito a la biblioteca de iconos
library.add(faShoppingCart);

function CartWidget() {
  return (
    <div>
      <FontAwesomeIcon icon="shopping-cart" />
      <span className="badge">1</span>
    </div>
  );
}

export default CartWidget;
