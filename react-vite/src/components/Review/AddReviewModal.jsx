import { useState } from 'react';
import '../../context/Modal.css';
import { useDispatch } from 'react-redux';
import {
  thunkAddAProductReview,
} from "../../redux/products";

const AddReviewModal = ({ onClose, setCurrentReview, productId }) => {
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setErrors({})
    await dispatch(thunkAddAProductReview(productId, { review: reviewText })).then(
      async (res) => {
        await res.review ? setErrors(res) : setCurrentReview(res)
      });

    if(reviewText) {
      setCurrentReview(reviewText)
      setReviewText('');
      onClose();
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
          {errors.review && <p className="error-message">{errors.review}</p>}
          <div className="form-group">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={()=>{
              setErrors({})
              onClose()
            }
            } style={{ backgroundColor: 'gray', marginLeft: '10px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
