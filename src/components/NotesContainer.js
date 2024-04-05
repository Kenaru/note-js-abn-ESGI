import React, { useState } from "react";
import "../App.css";

function NotesContainer({
  notes,
  handleNoteClick,
  handleToggleNoteCompletion,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;
    const escapedTerm = escapeRegExp(searchTerm);
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sliceText = (text) => {
    const maxLength = 15;
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const sortedNotes = filteredNotes.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    } else {
      return new Date(b.lastupdateAt) - new Date(a.lastupdateAt);
    }
  });

  return (
    <div className="notes-container">
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {sortedNotes.map((note) => (
        <div
          key={note.id}
          className={`note ${note.completed ? "completed" : ""}`}
          onClick={() => handleNoteClick(note)}
        >
          <div
            className="title"
            dangerouslySetInnerHTML={{
              __html: highlightText(sliceText(note.title)),
            }}
          ></div>
          <div
            className="preview"
            dangerouslySetInnerHTML={{
              __html: highlightText(sliceText(note.content)),
            }}
          ></div>
          <div className="last-update">
            {new Date(note.lastupdateAt).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          {note.pinned && <i className="material-icons">push_pin</i>}
          <input
            type="checkbox"
            checked={note.completed}
            onChange={() => handleToggleNoteCompletion(note.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default NotesContainer;
