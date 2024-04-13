import React, { useState } from "react";
import { useDebouncedEffect } from "./useDebouncedEffect";
import ConfirmationModal from "./ConfirmationModal"; // Import du composant de modal de confirmation

function NoteEditor({
  selectedNote,
  handleUpdateNote,
  handleDeleteNote,
  handleShowAllNotes,
  showAllNotes,
  handlePinNote,
}) {
  const [updatedTitle, setUpdatedTitle] = useState(selectedNote.title);
  const [updatedContent, setUpdatedContent] = useState(selectedNote.content);
  const [isModified, setIsModified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // État pour gérer la visibilité de la modal de confirmation

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
    setIsModified(true);
  };

  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
    setIsModified(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedNote = {
        ...selectedNote,
        title: updatedTitle,
        content: updatedContent,
        lastupdateAt: new Date().toISOString(),
      };

      await handleUpdateNote(updatedNote);
      setIsModified(false);
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la note :",
        error.message
      );
      setErrorMessage("Erreur lors de la mise à jour de la note.");
    }
  };

  const handleDeleteButtonClick = async () => {
    // Afficher la modal de confirmation
    setShowConfirmationModal(true);
  };

  const handlePinButtonClick = async () => {
    try {
      await handlePinNote();
    } catch (error) {
      console.error("Erreur lors de l'épinglage de la note :", error.message);
    }
  };

  useDebouncedEffect(
    () => {
      if (isModified) {
        handleSaveClick();
      }
    },
    [updatedTitle, updatedContent],
    20_000
  );

  return (
    <div className="selected-note">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="selected-note-header">
        <input
          type="textarea"
          className="selected-title"
          value={updatedTitle}
          onChange={handleTitleChange}
        />
        {!showAllNotes && (
          <button onClick={handleShowAllNotes} className="comeback">
            Retour
          </button>
        )}
        <button onClick={handlePinButtonClick} className="pin-button">
          {selectedNote.pinned ? "Désépingler" : "Épingler"}
        </button>
      </div>
      <textarea
        value={updatedContent}
        className="textarea"
        onChange={handleContentChange}
      ></textarea>
      <div className="container">
        {isModified && (
          <button className="save-button" onClick={handleSaveClick}>
            Enregistrer
          </button>
        )}
        <button className="delete-button" onClick={handleDeleteButtonClick}>
          Supprimer
        </button>
      </div>
      {/* Modal de confirmation */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={async () => {
          try {
            await handleDeleteNote(selectedNote.id);
            setShowConfirmationModal(false); // Cacher la modal de confirmation après suppression
            setErrorMessage("");
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de la note :",
              error.message
            );
            setErrorMessage("Erreur lors de la suppression de la note.");
          }
        }}
      >
        Êtes-vous sûr de vouloir supprimer cette note ?
      </ConfirmationModal>
    </div>
  );
}

export default NoteEditor;
