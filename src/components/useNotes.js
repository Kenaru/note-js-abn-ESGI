import { useState, useEffect } from "react";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowAllNotes(false);
  };

  const handleShowAllNotes = () => {
    setShowAllNotes(true);
    setSelectedNote(null);
  };

  const handleCreateNewNote = async (title, content) => {
    setLoading(true);
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        lastupdateAt: new Date(),
      }),
    });
    const newNote = await response.json();
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote); // Sélectionne automatiquement la nouvelle note créée
    setShowAllNotes(false); // Affiche la nouvelle note créée
    setLoading(false);
  };

  const handleUpdateNote = async (updatedNote) => {
    setLoading(true);
    const response = await fetch(`/notes/${updatedNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });
    const updatedNoteFromServer = await response.json();
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? updatedNoteFromServer : note
      )
    );
    setSelectedNote(updatedNoteFromServer);
    setLoading(false);
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);
    await fetch(`/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNote(null);
    setLoading(false);
  };

  return {
    notes,
    loading,
    selectedNote,
    showAllNotes,
    handleShowAllNotes,
    handleCreateNewNote,
    handleNoteClick,
    handleUpdateNote,
    handleDeleteNote,
  };
}
