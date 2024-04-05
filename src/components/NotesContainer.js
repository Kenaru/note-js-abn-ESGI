import React from "react";

function NotesContainer({ notes, handleNoteClick }) {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note"
          onClick={() => handleNoteClick(note)}
        >
          <div className="title">
            {note.title.length > 20
              ? `${note.title.slice(0, 15)}...`
              : note.title}
          </div>
          <div className="preview">
            {note.content.length > 20
              ? `${note.content.slice(0, 15)}...`
              : note.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesContainer;
