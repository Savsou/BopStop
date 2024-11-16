import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  thunkGetWishlist,
  thunkRemoveWishlistItem,
} from "../../redux/wishlist";
import "./Wishlist.css";

function Wishlist() {
  // const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [error, setError] = useState(null);

  console.log("wishlist", JSON.stringify(wishlist));

  useEffect(() => {
    // fetchWishlist();
    dispatch(thunkGetWishlist())
  }, [dispatch]);

  // const fetchWishlist = async () => {
  //   try {
  //     const response = await fetch('/api/wishlist/session');
  //     const data = await response.json();
  //     if (response.ok) {
  //       // setWishlist(data.wishlist);
  //     } else {
  //       setError(data.message || 'Failed to load wishlist');
  //     }
  //   } catch (err) {
  //     setError('Failed to load wishlist');
  //   }
  // };

  // const removeFromWishlist = async (productId) => {
  //   try {
  //     const response = await fetch(`/api/wishlist/${productId}`, {
  //       method: "DELETE",
  //     })

  //     const data = await response.json()

  //     if (response.ok) {
  //       fetchWishlist()
  //     } else {
  //       setError(data.message || 'Failed to remove product from wishlist')
  //     }
  //   } catch (err) {
  //     setError("Failed to remove product")
  //   }
  // };

  const handleDelete = async (productId) => {
    dispatch(thunkRemoveWishlistItem(productId));
  };

  return (
    <div className="wishlist-product-row">
      {/* <h2 className="wishlist-header">My Wishlist</h2> */}
      {error && <p className="error">{error}</p>}
      <div className="wishlist-products">
        {Object.values(wishlist).map((product) => (
          <div key={product.productId} className="wishlist-product-card">
            <Link to={`/products/${product.productId}`}>
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="wishlist-product-image"
              />
            </Link>
            <div className="wishlist-product-info">
              <h3 className="wishlist-product-name">{product.productName}</h3>
              <p className="wishlist-product-artist">by {product.artistName}</p>
              {/* <p className='wishlist-item-price'>{product.price}</p> */}
            </div>
            <button
              onClick={() => handleDelete(product.productId)}
              className="wishlist-item-remove"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={() => addToWishlist(1)} className="wishlist-add-button">
        <FontAwesomeIcon icon={faHeart} /> Add Product 1 to Wishlist
      </button> */}
    </div>
  );
}

export default Wishlist;
