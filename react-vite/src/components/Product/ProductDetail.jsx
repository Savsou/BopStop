import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddReviewModal from "../Review/AddReviewModal";
import EditReviewModal from "../Review/EditReviewModal";
import RemoveReviewModal from "../Review/RemoveReviewModal";
import Cart from "../Cart/Cart";
import {
  thunkRemoveReview,
  thunkEditReview,
  thunkGetUserReviews,
} from "../../redux/reviews";
import {
  thunkGetProductReviews,
  thunkAddAProductReview,
  thunkGetProductById,
} from "../../redux/products";
import { thunkAddWishlistItem, selectWishlistItem, thunkRemoveWishlistItem, thunkGetWishlist } from "../../redux/wishlist";
import {
  thunkGetCart,
  thunkAddCartItem,
  thunkRemoveCartItem,
} from "../../redux/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  // faCartPlus,
  faPlus,
  faPenToSquare,
  faTrash,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductDetail.css";
import ConfirmationModal from "../../context/ConfirmationModal";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ProductDetail = () => {
  const { productId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const wishlist = useSelector(state => selectWishlistItem(state, productId))
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showWishlistConfirmModal, setShowWishlistConfirmModal] = useState(false);
  const [showWishlistRemoveModal, setShowWishlistRemoveModal] = useState(false);
  const [currentReview, setCurrentReview] = useState("");
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(thunkGetProductById(productId)).then((res) => setProduct(res));
  }, [productId, dispatch]);

  useEffect(() => {
    dispatch(thunkGetUserReviews());
    dispatch(thunkGetProductReviews(productId)).then((res) =>
      setReviews(res.reviews)
    );
  }, [currentReview, dispatch, productId]);

  useEffect(() => {
    if (sessionUser) dispatch(thunkGetCart());
  }, [productId, sessionUser, dispatch]);

  useEffect(() => {
    if (sessionUser) dispatch(thunkGetWishlist())
  }, [sessionUser, dispatch])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddReview = async (reviewText) => {
    dispatch(thunkAddAProductReview(productId, { review: reviewText })).then(
      (res) => setCurrentReview(res)
    );
    closeModals();
  };

  const handleEditReview = async (reviewId, reviewText) => {
    dispatch(thunkEditReview(reviewId, { review: reviewText })).then((res) =>
      setCurrentReview(res)
    );
    closeModals();
  };

  const handleRemoveReview = async (reviewId) => {
    dispatch(thunkRemoveReview(reviewId, productId)).then((res) => {
      console.log(res);
      setCurrentReview("");
    });
    closeModals();
  };

  const openAddReviewModal = () => setShowAddModal(true);
  const openEditReviewModal = (review) => {
    setCurrentReview(review);
    setShowEditModal(true);
  };
  const openRemoveReviewModal = (review) => {
    setCurrentReview(review);
    setShowRemoveModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowRemoveModal(false);
    setCurrentReview(null);
  };

  const addToWishlist = async (productId) => {
    dispatch(thunkAddWishlistItem(productId));
    // alert("Added product to wishlist");
    setShowWishlistConfirmModal(true);
  };

  const removeFromWishlist = async (productId) => {
    dispatch(thunkRemoveWishlistItem(productId));
    // alert("Removed product from wishlist");
    setShowWishlistRemoveModal(true);
  }

  const addToCart = (productId) => {
    dispatch(thunkAddCartItem(productId));
  };

  const removeFromCart = (productId) => {
    dispatch(thunkRemoveCartItem(productId));
  };

  if (error) return <p>{error}</p>;
  // if (!product) return <p>Loading...</p>;
  if (!product) return (
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
        <div className="banner-container">
          {/* Banner Section */}
          {product?.bannerImageUrl && (
            <div
              className="banner"
              style={{ backgroundImage: `url(${product.bannerImageUrl})` }}
            />
          )}
        </div>
        <div className="product-detail">
          <div className="product-column">
            <div className="product-meta">
              <div className="product-info-column">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-artist">
                  by{" "}
                  <span className="product-artist-name">
                    {product.artistName}
                  </span>
                </p>
                <img
                  src="/images/play.png"
                  alt="Product Image"
                  className="product-play"
                />
                <p className="product-type">{product.type}</p>
                <p className="product-genre">
                  {product.genre ? product.genre : "Streaming + Download"}
                </p>
                <p className="product-description">{product.description}</p>
                <p className="download-available">
                  Download available in 16-bit/44.1kHz.
                </p>
                <p className="product-price">
                  {sessionUser && (
                    <span
                      onClick={() => addToCart(product.productId)}
                      className="add-to-cart"
                      style={{ cursor: "pointer" }} // Optional: To show it's clickable
                    >
                      {/* <FontAwesomeIcon icon={faCartPlus} className="nav-icon" />{" "} */}
                      Add to Cart
                    </span>
                  )}
                  ${product.price}
                  <span className="USD">USD</span>
                  <span className="or-more">or more</span>
                </p>
                {/* <p className="product-created-time">
                released {formatDate(product.createdAt)}
              </p> */}
                <p className="lyric">
                  {product.artistName} ๏ vocals, guitars, charango, cellos,
                  percussions
                  <br></br>
                  Tuulia ๏ vocals<br></br>
                  Misha Mullov-Abbado ๏ double bass<br></br>
                  Shir-Ran Yinon ๏ violin<br></br>
                  <br></br>
                  <br></br>
                  Spririts around we’re grateful for your presence<br></br>
                  Ancestors around we hear your songs in the wind<br></br>
                  We walk on holy ground<br></br>
                  listen to the ancient sound<br></br>
                  Spirits around we’re dancing with you<br></br>
                  <br></br>
                  Andelelele<br></br>
                  Andelelele<br></br>
                  Andelelele leyo<br></br>
                  <br></br>
                  <br></br>
                  from {product.artistName}, released February 3, 2023<br></br>
                  Music & lyrics by {product.artistName}
                  <br></br>
                  <br></br>
                  <br></br>
                  all rights reserved<br></br>
                </p>
                <p className="tag-title">Tags</p>
                <p className="tags">
                  #world #medicinemusic world medicina medicine music medicine
                  songs world music Leipzig
                </p>
                {/* {sessionUser &&
                <button onClick={() => addToCart(product.productId)} className="product-detail-button">
                  <FontAwesomeIcon icon={faCartPlus} className="nav-icon" /> Add to Cart
                </button>
              } */}
              </div>
              <div className="product-image-column">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image-big"
                />
                <button className="product-detail-button">
                  <FontAwesomeIcon icon={faShare} className="nav-icon" /> Share
                  / Embed
                </button>
                {/* Wishlist Button */}
                {sessionUser &&
                (wishlist[productId] ?
                  <button
                    onClick={() => removeFromWishlist(productId)}
                    className="product-detail-button"
                    style={{color:'grey'}}
                  >
                    <FontAwesomeIcon icon={faHeart} className="nav-icon" />{" "}
                    Wishlist
                  </button>
                  :
                  <button
                    onClick={() => addToWishlist(productId)}
                    className="product-detail-button"
                  >
                    <FontAwesomeIcon icon={faHeart} className="nav-icon" />{" "}
                    Wishlist
                  </button>
                )}
                {/* Reviews Section */}
                <div className="reviews-section">
                  <p className="reviews-title">supported by</p>
                  {reviews.length > 0 ? (
                    <>
                      {reviews.map((review, index) => (
                        <div className="review" key={index}>
                          <div className="review-image">
                            <img
                              src={review.profileImageUrl}
                              alt={`${review.artistName}'s profile`}
                              className="profile-image"
                            />
                          </div>
                          <div className="review-info">
                            <p className="review-content">
                              <span className="review-name">
                                <strong>
                                  {review.artistName || "Anonymous"}
                                </strong>
                              </span>
                              {review.review}
                            </p>
                            {sessionUser && sessionUser.id === review.userId ? (
                              <>
                                <button
                                  onClick={() => openEditReviewModal(review)}
                                  className="product-detail-button"
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="nav-icon"
                                  />
                                  Edit
                                </button>
                                <button
                                  onClick={() => openRemoveReviewModal(review)}
                                  className="product-detail-button"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="nav-icon"
                                  />
                                  Remove
                                </button>
                              </>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      ))}
                      <p className="more">more...</p>
                      <img
                        src="/images/supporters.png" // Update with the correct path to your image
                        alt="Supporter Icon"
                        className="supporter-image"
                      />
                      <p className="more">more...</p>
                    </>
                  ) : (
                    <p>No reviews available for this product.</p>
                  )}
                  {sessionUser &&
                  product.userId !== sessionUser.id &&
                  !reviews.find(
                    (review) => review.userId === sessionUser.id
                  ) ? (
                    <button
                      onClick={openAddReviewModal}
                      className="product-detail-button"
                    >
                      <FontAwesomeIcon icon={faPlus} className="nav-icon" />
                      Add
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="artist-column">
            {/* Conditionally render the Cart component if the product is in the cart */}
            {cart.subtotal > 0 && sessionUser && (
              <Cart cart={cart} removeFromCart={removeFromCart} />
            )}
            <img
              src={product.profileImageUrl}
              alt={`${product.artistName}'s profile`}
              className="profile-image-small"
            />
            <p className="product-artist">{product.artistName}</p>
            <p className="US">US</p>
            <button className="follow">Follow</button>
            <p className="artist-bio">
              {product.artistBio}<br></br>
              <br></br>
            </p>
            <p className="bio-more">
              more<br></br>
              <br></br>aquario-music.com
            </p>
            <p className="artist-discography">discography</p>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image-small"
            />
            <p className="product-name-small">{product.name}</p>
            <p className="product-created-time">
              {formatDate(product.createdAt)}
            </p>
            <p className="artist-contact">contact / help</p>
            <p className="bio-more">
              <br></br>Contact {product.artistName}
              <br></br>
              <br></br>
              Streaming and Download help
              <br></br>
              <br></br>
              Report this album or account
            </p>
          </div>
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddReviewModal onClose={closeModals} onSubmit={handleAddReview} />
        )}

        {showEditModal && currentReview && (
          <EditReviewModal
            review={currentReview}
            onClose={closeModals}
            onSubmit={(reviewText) =>
              handleEditReview(currentReview.id, reviewText)
            }
          />
        )}

        {showRemoveModal && currentReview && (
          <RemoveReviewModal
            review={currentReview}
            onClose={closeModals}
            onConfirm={() => handleRemoveReview(currentReview.id)}
          />
        )}

        {showWishlistRemoveModal && (
          <ConfirmationModal
            onClose={() => {
              setShowWishlistRemoveModal(false);
            }}
            message={"You have removed the product to your wishlist!"}
          />
        )};

        {showWishlistConfirmModal && (
          <ConfirmationModal
            onClose={() => {
              setShowWishlistConfirmModal(false)
            }}
            message={"You have added the product to your wishlist!"}
          />
        )};

      </div>
    </div>
  );
};

export default ProductDetail;
