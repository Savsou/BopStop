import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./Cart.css";

function Cart({ cartItems, handleCheckout }) {
  if (cartItems.length === 0) return null;

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item">
            <span>{item.name} - ${item.price} x 1</span>
            <button className="cart-item-remove">
              <FontAwesomeIcon icon={faTrashAlt} /> Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} className="cart-checkout-button">Checkout</button>
    </div>
  );
}

export default Cart;
