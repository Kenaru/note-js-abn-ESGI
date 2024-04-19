import React from "react";
import "./ConfirmationModal.css";

// Composant pour afficher une modal de confirmation
function ConfirmationModal({ isOpen, onCancel, onConfirm, children }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Contenu de la modal */}
            <p>{children}</p>
            <div className="modal-buttons">
              {/* Bouton pour annuler l'action */}
              <button className="undo-button" onClick={onCancel}>
                Annuler
              </button>
              {/* Bouton pour confirmer l'action */}
              <button className="delete-button" onClick={onConfirm}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;
