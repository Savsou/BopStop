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
    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems([]);
        setSubtotal(0);
        alert(data.message);
        navigate('/checkout');
      } else {
        setError(data.message || 'Checkout failed');
      }
    } catch (err) {
      setError('Checkout failed');
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
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
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
