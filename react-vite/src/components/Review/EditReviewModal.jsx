import { useState, useEffect } from 'react';
import '../../context/Modal.css';

const EditReviewModal = ({ review, onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    // Check if review object exists and has a valid review property
    if (review && review.review) {
      setReviewText(review.review);
    }
  }, [review]);

  const handleEdit = async () => {
    try {
      await onSubmit(reviewText);  // Ensure `onSubmit` completes before proceeding
      onClose();                   // Close the modal only if edit is successful
    } catch (error) {
      console.error("Failed to edit review:", error);  // Log if there’s an error
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
