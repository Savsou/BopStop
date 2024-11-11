import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlists', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data.wishlist);
      } else {
        setError(data.message || 'Failed to load wishlist');
      }
    } catch (err) {
      setError('Failed to load wishlist');
    }
  };

  const addToWishlist = async (productId) => {
    // Implementation
  };

  const removeFromWishlist = async (productId) => {
    // Implementation
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-header">My Wishlist</h2>
      {error && <p className="error">{error}</p>}
      <ul className="wishlist-items">
        {wishlist.map((product) => (
          <li key={product.productId} className="wishlist-item">
            <span className="wishlist-item-name">{product.productName} - ${product.price}</span>
            <button onClick={() => removeFromWishlist(product.productId)} className="wishlist-item-remove">
              <FontAwesomeIcon icon={faTrashAlt} /> Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToWishlist(1)} className="wishlist-add-button">
        <FontAwesomeIcon icon={faHeart} /> Add Product 1 to Wishlist
      </button>
    </div>
  );
}

export default Wishlist;
