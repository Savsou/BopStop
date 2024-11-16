import React from 'react';
import '../context/Modal.css'

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div id="modal">
      <div id="modal-background" onClick={onClose}></div>
      <div id="modal-content">
        <h3 className="modal-title">Confirm Edit</h3>
        <div className="modal-content">
          <p>Are you sure?</p>
          <div className="form-group">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onClose} style={{ backgroundColor: 'gray', marginLeft: '10px' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
