import React from 'react';
import './RemoveProductModal.css';

const RemoveProductModal = ({ productId, onConfirm, onCancel }) => {
  const handleDelete = () => {
    onConfirm(productId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Product Deletion</h3>
        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleDelete}>Yes, Delete</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveProductModal;
