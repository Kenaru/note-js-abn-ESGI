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
  const [isModified, setIsModified] = React.useState(false);

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
    setIsModified(true);
  };

  const handleContentChange = (event) => {
    setUpdatedContent(event.target.value);
    setIsModified(true);
  };

  const handleSaveClick = () => {
    handleUpdateNote({
      ...selectedNote,
      title: updatedTitle,
      content: updatedContent,
    });
    setIsModified(false);
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
