import { useState } from 'react';
import '../../context/Modal.css';

const AddReviewModal = ({ onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit(reviewText);  // Ensure `onSubmit` completes before proceeding
      setReviewText('');  // Clear the text after successful submission
      onClose();          // Close the modal
    } catch (error) {
      console.error("Failed to add review:", error);  // Log if there’s an error
    }
  };

  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <h3 className="modal-title">Add a Review</h3>
        <div className="modal-content">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            style={{ width: '100%', height: '80px', padding: '10px' }}
          />
          <div className="form-group">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose} style={{ backgroundColor: 'gray', marginLeft: '10px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
