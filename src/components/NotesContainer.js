import React, { useState } from "react";
import "../App.css";

// Composant pour afficher la liste des notes
function NotesContainer({
  notes,
  handleNoteClick,
  handleToggleNoteCompletion,
}) {
  // État pour gérer le terme de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour échapper les caractères spéciaux dans une expression régulière
  const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Fonction pour mettre en évidence le terme de recherche dans le texte
  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;
    const escapedTerm = escapeRegExp(searchTerm);
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  // Filtrer les notes en fonction du terme de recherche
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour tronquer le texte
  const sliceText = (text) => {
    const maxLength = 15;
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  // Trier les notes
  const sortedNotes = filteredNotes.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    } else {
      return new Date(b.lastupdateAt) - new Date(a.lastupdateAt);
    }
  });

  // Rendu du composant
  return (
    <div className="notes-container">
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Liste des notes */}
      {sortedNotes.map((note) => (
        <div
          key={note.id}
          className={`note ${note.completed ? "completed" : ""}`}
          onClick={() => handleNoteClick(note)}
        >
          <div className="title">
            {/* Titre de la note avec mise en évidence */}
            <span
              dangerouslySetInnerHTML={{
                __html: highlightText(sliceText(note.title)),
              }}
            ></span>
            {/* Affichage des étiquettes de la note */}
            {note.labels &&
              note.labels.map((label, index) => (
                <span key={index} className="label">
                  {label}
                </span>
              ))}
          </div>
          {/* Aperçu du contenu de la note avec mise en évidence */}
          <div
            className="preview"
            dangerouslySetInnerHTML={{
              __html: highlightText(sliceText(note.content)),
            }}
          ></div>
          {/* Date de dernière mise à jour */}
          <div className="last-update">
            {new Date(note.lastupdateAt).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          {/* Icône d'épingle si la note est épinglée */}
          {note.pinned && <i className="material-icons">push_pin</i>}
          {/* Case à cocher pour marquer la note comme terminée */}
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
