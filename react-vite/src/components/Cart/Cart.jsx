import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cartDetails);
        setSubtotal(data.subtotal);
      } else {
        setError(data.message || 'Failed to load cart items');
      }
    } catch (err) {
      setError('Failed to load cart items');
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCartItems();
      } else {
        setError(data.message || 'Failed to add product');
      }
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
        setSubtotal(prevSubtotal => prevSubtotal - data.price * data.quantity);
      } else {
        setError(data.message || 'Failed to remove product');
      }
    } catch (err) {
      setError('Failed to remove product');
    }
  };

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h3>Shopping Cart</h3>
      {error && <p className="error">{error}</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            <span>{item.productName} - ${item.price} x {item.quantity}</span>
            <button onClick={() => removeFromCart(item.productId)} className="cart-item-remove">
              <FontAwesomeIcon icon={faTrashAlt} /> Remove
            </button>
          </li>
        ))}
      </ul>
          <p className='cart-subtotal'>Subtotal: ${subtotal.toFixed(2)}</p>
          <p className='cart-notes'>taxes calculated at checkout</p>
      <button onClick={handleCheckout} className='cart-checkout'>Checkout</button>
    </div>
  );
}

export default Cart;
