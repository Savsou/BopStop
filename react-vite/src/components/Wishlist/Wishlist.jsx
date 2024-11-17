import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  thunkGetWishlist,
  thunkRemoveWishlistItem,
} from "../../redux/wishlist";
import "./Wishlist.css";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Wishlist() {
  // const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/session");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  console.log("wishlist", JSON.stringify(wishlist));

  useEffect(() => {
    // fetchWishlist();
    dispatch(thunkGetWishlist());
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

  if (!wishlist || !user) return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <div className="product-detail-page">
          <div className="product-row">
        {/* Banner Section */}
        {user?.bannerImageUrl && (
          <div
            className="banner"
            style={{ backgroundImage: `url(${user.bannerImageUrl})` }}
          />
        )}
        <div className="wishlist-product-row">
          <h2 className="wishlist-header">My Wishlist</h2>
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
                  <h3 className="wishlist-product-name">
                    {product.productName}
                  </h3>
                  <p className="wishlist-product-artist">
                    by {product.artistName}
                  </p>
                  {/* <p className='wishlist-item-price'>{product.price}</p> */}
                </div>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="wishlist-item-remove"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            ))}
          </div>
          {/* <button onClick={() => addToWishlist(1)} className="wishlist-add-button">
        <FontAwesomeIcon icon={faHeart} /> Add Product 1 to Wishlist
      </button> */}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
