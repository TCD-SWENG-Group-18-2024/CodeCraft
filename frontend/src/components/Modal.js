// Modal.js
import React from 'react';
import '../styles/Modal.css';

const Modal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">X</button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={member.image} alt={member.name} className="modal-image" />
          </div>
          <div className="modal-text-container">
            <h3 className="modal-member-name">{member.name}</h3>
            <p className="modal-member-role">{member.role}</p>
            <p className="modal-member-description">

              {member.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
