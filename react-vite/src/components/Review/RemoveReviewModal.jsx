import React from 'react';
import '../../context/Modal.css';

const RemoveReviewModal = ({ review, onClose, onConfirm }) => {
  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <h3 className="modal-title">Confirm Removal</h3>
        <div className="modal-content">
          <p>Are you sure you want to remove this review?</p>
          <p><strong>{review.review}</strong></p>
          <div className="form-group">
            <button onClick={onConfirm}>Yes, Remove</button>
            <button onClick={onClose} style={{ backgroundColor: 'gray', marginLeft: '10px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveReviewModal;
