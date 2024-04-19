import React, { useState } from "react";
import { useDebouncedEffect } from "./useDebouncedEffect";
import ConfirmationModal from "./ConfirmationModal";

// Composant pour l'édition d'une note
function NoteEditor({
  selectedNote,
  handleUpdateNote,
  handleDeleteNote,
  handleShowAllNotes,
  showAllNotes,
  handlePinNote,
}) {
  // Gestion des états des champs de la note
  const [updatedTitle, setUpdatedTitle] = useState(selectedNote.title);
  const [updatedContent, setUpdatedContent] = useState(selectedNote.content);
  const [isModified, setIsModified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Fonction pour gérer le changement de titre
  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
    setIsModified(true);
  };

  // Fonction pour gérer le changement de contenu
  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
    setIsModified(true);
  };

  // Fonction pour sauvegarder les modifications de la note
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

  // Fonction pour gérer le clic sur le bouton de suppression de la note
  const handleDeleteButtonClick = async () => {
    // Afficher la modal de confirmation
    setShowConfirmationModal(true);
  };

  // Fonction pour gérer le clic sur le bouton d'épinglage de la note
  const handlePinButtonClick = async () => {
    try {
      await handlePinNote();
    } catch (error) {
      console.error("Erreur lors de l'épinglage de la note :", error.message);
    }
  };

  // Effet debounce pour sauvegarder automatiquement les modifications de la note
  useDebouncedEffect(
    () => {
      if (isModified) {
        handleSaveClick();
      }
    },
    [updatedTitle, updatedContent],
    20_000
  );

  // Rendu du composant
  return (
    <div className="selected-note">
      {/* Affichage du message d'erreur */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="selected-note-header">
        {/* Champ de saisie du titre */}
        <input
          type="textarea"
          className="selected-title"
          value={updatedTitle}
          onChange={handleTitleChange}
        />
        {/* Bouton pour revenir à la liste des notes */}
        {!showAllNotes && (
          <button onClick={handleShowAllNotes} className="comeback">
            Retour
          </button>
        )}
        {/* Bouton pour épingler/désépingler la note */}
        <button onClick={handlePinButtonClick} className="pin-button">
          {selectedNote.pinned ? "Désépingler" : "Épingler"}
        </button>
      </div>
      {/* Champ de saisie du contenu */}
      <textarea
        value={updatedContent}
        className="textarea"
        onChange={handleContentChange}
      ></textarea>
      <div className="container">
        {/* Bouton pour sauvegarder les modifications */}
        {isModified && (
          <button className="save-button" onClick={handleSaveClick}>
            Enregistrer
          </button>
        )}
        {/* Bouton pour supprimer la note */}
        <button className="delete-button" onClick={handleDeleteButtonClick}>
          Supprimer
        </button>
      </div>
      {/* Modal de confirmation pour la suppression de la note */}
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
