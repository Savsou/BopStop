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
    dispatch(thunkGetWishlist());
  }, [dispatch]);

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
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
