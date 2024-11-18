import { useState, useEffect } from 'react';
import '../../context/Modal.css';
import { thunkEditReview } from '../../redux/reviews';
import { useDispatch } from 'react-redux';

const EditReviewModal = ({ review, onClose, setCurrentReview}) => {
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if review object exists and has a valid review property
    if (review && review.review) {
      setReviewText(review.review);
    }
  }, [review]);

  const handleEdit = async () => {
    setErrors({});
    const res = await dispatch(thunkEditReview(review.id, { review: reviewText }))
    if (res.errors) setErrors(res.errors);
    else {
      setCurrentReview(res)
      onClose()
    }
  };

  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <h3 className="modal-title">Edit Review</h3>
        <div className="modal-content">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Edit your review..."
            style={{ width: '100%', height: '80px', padding: '10px' }}
          />
          {errors && <p className="error-message">{errors.review}</p>}
          <div className="form-group">
            <button onClick={handleEdit}>Save</button>
            <button onClick={onClose} style={{ backgroundColor: 'gray', marginLeft: '10px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
