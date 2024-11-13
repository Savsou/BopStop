import React from 'react';
import './RemoveProductModal.css';
import '../../context/Modal.css'

const RemoveProductModal = ({ productId, onConfirm, onCancel }) => {
  const handleDelete = () => {
    onConfirm(productId);
  };

  return (
    <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
                <span>Delete Item?</span>
            </div>
            <div className="modal-content">
                <p>Are you sure you want to permanently delete this item?</p>
            </div>
            <div className="modal-buttons">
                <button className="confirm-button" onClick={handleDelete}>Yes, delete it</button>
                <button className="cancel-button" onClick={onCancel}>No, keep it</button>
            </div>
        </div>
    </div>
  );
};

export default RemoveProductModal;
