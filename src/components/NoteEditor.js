import React from "react";
import { useDebouncedEffect } from "./useDebouncedEffect";

function NoteEditor({
  selectedNote,
  handleUpdateNote,
  handleDeleteNote,
  handleShowAllNotes,
  showAllNotes,
}) {
  const [updatedTitle, setUpdatedTitle] = React.useState(selectedNote.title);
  const [updatedContent, setUpdatedContent] = React.useState(
    selectedNote.content
  );
  const [isModified, setIsModified] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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
    try {
      await handleDeleteNote(selectedNote.id);
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la note :",
        error.message
      );
      setErrorMessage("Erreur lors de la suppression de la note.");
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
    </div>
  );
}

export default NoteEditor;
