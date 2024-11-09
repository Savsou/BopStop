import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddReviewModal from '../Review/AddReviewModal';
import EditReviewModal from '../Review/EditReviewModal';
import RemoveReviewModal from '../Review/RemoveReviewModal';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  const handleAddReview = async (reviewText) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: reviewText }),
      });
      if (!response.ok) throw new Error("Failed to add review");
      const newReviewData = await response.json();
      setReviews((prev) => [...prev, newReviewData]);
      setShowAddModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditReview = async (reviewId, reviewText) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: reviewText }),
      });
      if (!response.ok) throw new Error("Failed to edit review");
      const updatedReview = await response.json();
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? updatedReview : review))
      );
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete review");
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      setShowRemoveModal(false);
      navigate(`/products/${productId}`);
    } catch (err) {
      setError(err.message);
    }
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

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="go-back-button">Go Back</button>
      
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-type">Type: {product.type}</p>
        {product.genre && <p className="product-genre">Genre: {product.genre}</p>}
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-description">{product.description}</p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <button onClick={openAddReviewModal} className="add-review-button">Add Review</button>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p><strong>{review.user?.username || 'Anonymous'}</strong></p>
              <p>{review.review}</p>
              <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
              <button onClick={() => openEditReviewModal(review)} className="edit-button">Edit</button>
              <button onClick={() => openRemoveReviewModal(review)} className="remove-button">Remove</button>
            </div>
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
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
