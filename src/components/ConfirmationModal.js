//ConfirmationModal.js
import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onCancel, onConfirm, children }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>{children}</p>
            <div className="modal-buttons">
              <button className="undo-button" onClick={onCancel}>Annuler</button>
              <button className="delete-button" onClick={onConfirm}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;
