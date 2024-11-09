import React, { useState, useEffect } from 'react';
import '../../context/Modal.css';

const EditReviewModal = ({ review, onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState(review.review);

  useEffect(() => {
    setReviewText(review.review);
  }, [review]);

  const handleEdit = () => {
    onSubmit(reviewText);
    setReviewText('');
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
