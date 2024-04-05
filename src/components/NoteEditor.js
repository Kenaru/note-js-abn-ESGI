import React from "react";

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
  const [isModified, setIsModified] = React.useState(false); // Variable d'état pour suivre les modifications

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
    setIsModified(true); // Marquer comme modifié lorsqu'il y a un changement de titre
  };

  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
    setIsModified(true); // Marquer comme modifié lorsqu'il y a un changement de contenu
  };

  const handleSaveClick = () => {
    handleUpdateNote({
      ...selectedNote,
      title: updatedTitle,
      content: updatedContent,
    });
    setIsModified(false); // Réinitialiser l'état des modifications après l'enregistrement
  };

  return (
    <div className="selected-note">
      <div className="selected-note-header">
        <input
          type="textarea"
          className="slected-title"
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
        <button
          className="delete-button"
          onClick={() => handleDeleteNote(selectedNote.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
