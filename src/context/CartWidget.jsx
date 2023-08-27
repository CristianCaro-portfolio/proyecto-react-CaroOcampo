import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './CartWidget.css'; // Import personalized style file

// Add cartwidget icon to library
library.add(faShoppingCart);

function CartWidget({ cartItemCount }) {
  return (
    <div>
      <Link to="/checkout"> {/* link to Checkout page */}
        <FontAwesomeIcon icon="shopping-cart" />
        {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>} {/* show quantity of elements in the cart */}
      </Link>
    </div>
  );
}

export default CartWidget;
