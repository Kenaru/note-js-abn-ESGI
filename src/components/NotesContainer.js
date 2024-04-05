import React, { useState } from "react";
import "../App.css";
function NotesContainer({ notes, handleNoteClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="note"
          onClick={() => handleNoteClick(note)}
        >
          <div className="title">
            {note.title.length > 15
              ? `${note.title.slice(0, 15)}...`
              : note.title}
          </div>
          <div className="preview">
            {note.content.length > 15
              ? `${note.content.slice(0, 15)}...`
              : note.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesContainer;
