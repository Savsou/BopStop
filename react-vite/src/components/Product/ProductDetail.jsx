import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AddReviewModal from '../Review/AddReviewModal';
import EditReviewModal from '../Review/EditReviewModal';
import RemoveReviewModal from '../Review/RemoveReviewModal';
import { thunkRemoveReview, thunkEditReview } from '../../redux/reviews';
import { thunkGetProductReviews, thunkAddAProductReview, thunkGetProductById  } from '../../redux/products_pristine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus, faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [currentReview, setCurrentReview] = useState('');
  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkGetProductById(productId)).then(res => setProduct(res));
  }, [productId])

  useEffect(() => {
    dispatch(thunkGetProductReviews(productId)).then(res => setReviews(res.reviews))
  },[currentReview])

  // useEffect(() => {

    // const fetchProduct = async () => {
      // try {
      //   const response = await fetch(`/api/products/${productId}`);
      //   if (!response.ok) throw new Error("Failed to fetch product details");
      //   const data = await response.json();
      //   setProduct(data);
      // } catch (err) {
      //   setError(err.message);
      // }
    // };

    // const fetchReviews = async () => { //i don't think we have a thunk for this yet
    //   try {
    //     const response = await fetch(`/api/products/${productId}/reviews`);
    //     if (!response.ok) throw new Error("Failed to fetch reviews");
    //     const data = await response.json();
    //     setReviews(data.reviews || []);
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // };

    // fetchProduct();
    // fetchReviews();
  // }, [productId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddReview = async (reviewText) => {
    dispatch(thunkAddAProductReview(productId, {review: reviewText})).then(res => setCurrentReview(res))
    closeModals()
    // try {
    //   const response = await fetch(`/api/products/${productId}/reviews`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ review: reviewText }),
    //   });
    //   if (!response.ok) throw new Error("Failed to add review");
    //   const newReviewData = await response.json();
    //   setReviews((prev) => [...prev, newReviewData]);
    //   setShowAddModal(false);
    // } catch (err) {
    //   setError(err.message);
    // }
  };


  const handleEditReview = async (reviewId, reviewText) => {
    dispatch(thunkEditReview(reviewId, {review: reviewText})).then(res => setCurrentReview(res))
    closeModals()
  //   try {
  //     const response = await fetch(`/api/reviews/${reviewId}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ review: reviewText }),
  //     });
  //     if (!response.ok) throw new Error("Failed to edit review");
  //     const updatedReview = await response.json();
  //     setReviews((prev) =>
  //       prev.map((review) => (review.id === reviewId ? updatedReview : review))
  //     );
  //     setShowEditModal(false);
  //     // navigate(`/products/${productId}`);
  //     // navigate(`/products/${productId}`);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  };

  const handleRemoveReview = async (reviewId) => {
    dispatch(thunkRemoveReview(reviewId)).then(res => setCurrentReview(""))
    closeModals()
    // try {
    //   const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    //   if (!response.ok) throw new Error("Failed to delete review");
    //   setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    //   setShowRemoveModal(false);
    //   navigate(`/products/${productId}`);
    // } catch (err) {
    //   setError(err.message);
    // }
    // try {
    //   const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    //   if (!response.ok) throw new Error("Failed to delete review");
    //   setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    //   setShowRemoveModal(false);
    //   navigate(`/products/${productId}`);
    // } catch (err) {
    //   setError(err.message);
    // }
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
    try {
      const response = await fetch('/api/wishlist/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to add product to wishlist");

      // Navigate to the wishlist page after successful addition
      navigate('/wishlist');
    } catch (err) {
      setError(err.message);
    }
  };

  const addToCart = () => {
    setIsInCart(true);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout with this item.");
    // Add additional checkout functionality here
  };


  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;


  return (
    <div className="product-detail-page">
      {/* Banner Section */}
      {/* {user?.profileImageUrl && (
        <div
          className="banner"
          style={{ backgroundImage: `url(${user.profileImageUrl})` }}
        />
      )}       */}
      <div className="product-detail">
        <div className="product-column">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-artist">by {product.artistName}</p>
          <div className='product-meta'>
            <div className='product-info-column'>
              <p className="product-type">{product.type}</p>
              {product.genre && <p className="product-genre">Genre: {product.genre}</p>}
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-created-time">released {formatDate(product.createdAt)}</p>
              <button onClick={() => addToCart(product.productId)} className="product-detail-button">
                <FontAwesomeIcon icon={faCartPlus} className="nav-icon" /> Add to Cart
              </button>
            </div>
            <div className='product-image-column'>
              <img src={product.imageUrl} alt={product.name} className="product-image-big" />
              {/* Wishlist Button */}
              <button onClick={() => addToWishlist(product.productId)} className="product-detail-button">
                <FontAwesomeIcon icon={faHeart} className="nav-icon" /> Wishlist
              </button>
              {/* Reviews Section */}
              <div className="reviews-section">
                <p className="reviews-title">supported by</p>{
                  sessionUser && product.userId !== sessionUser.id && !(reviews.find(review => review.userId === sessionUser.id)) ? (
                    <button onClick={openAddReviewModal} className="product-detail-button">
                      <FontAwesomeIcon icon={faPlus} className="nav-icon" />
                      Add
                    </button>
                  ) : (
                    <div></div>
                  )
                }
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div className='review'>
                      <div className='review-image'>
                        {/* <img src={user.profileImageUrl} alt={`${user.artistName}'s profile`} className="profile-image" /> */}
                      </div>
                      <div className="review-info">
                        <p className='review-content'>
                          <span className='review-name'><strong>{review.artistName || 'Anonymous'}</strong></span>
                          {review.review}
                        </p>
                        {
                          sessionUser && sessionUser.id === review.userId ? (
                            <>
                              <button onClick={() => openEditReviewModal(review)} className="product-detail-button">
                                <FontAwesomeIcon icon={faPenToSquare} className="nav-icon" />
                                Edit
                              </button>
                              <button onClick={() => openRemoveReviewModal(review)} className="product-detail-button">
                                <FontAwesomeIcon icon={faTrash} className="nav-icon" />
                                  Remove
                                </button>
                          </>
                        ) : (
                          <div></div>
                        )
                      }
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reviews available for this product.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="artist-column">
        {/* Conditionally render the Cart component if the product is in the cart */}
      {isInCart && (
        <Cart
          cartItems={[product]}
          handleCheckout={handleCheckout}
        />
      )}
          {/* <img src={user.profileImageUrl} alt={`${user.artistName}'s profile`} className="profile-image" /> */}
          <p className="product-artist">by {product.artistName}</p>
          <img src={product.imageUrl} alt={product.name} className="product-image-small" />
          <p className="product-name">{product.name}</p>
          <p className="product-created-time">{formatDate(product.createdAt)}</p>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddReviewModal
          onClose={closeModals}
          onSubmit={handleAddReview}
        />
      )}

      {showEditModal && currentReview && (
        <EditReviewModal
          review={currentReview}
          onClose={closeModals}
          onSubmit={(reviewText) => handleEditReview(currentReview.id, reviewText)}
        />
      )}

      {showRemoveModal && currentReview && (
        <RemoveReviewModal
          review={currentReview}
          onClose={closeModals}
          onConfirm={() => handleRemoveReview(currentReview.id)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
