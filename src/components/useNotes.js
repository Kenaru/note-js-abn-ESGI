import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/notes");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des notes.");
      }
      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleNoteClick = async (note) => {
    try {
      if (selectedNote) {
        setSelectedNote(null);
        setTimeout(() => {
          setSelectedNote(note);
          toast.success("Note chargée avec succès !");
        }, 15);
      } else {
        setSelectedNote(note);
        setShowAllNotes(false);
        toast.success("Note chargée avec succès !");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShowAllNotes = () => {
    setShowAllNotes(true);
    setSelectedNote(null);
  };

  const handleCreateNewNote = async (title, content) => {
    setLoading(true);
    try {
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          lastupdateAt: new Date(),
          pinned: false, // Par défaut, une nouvelle note n'est pas épinglée
          completed: false, // Par défaut, une nouvelle note n'est pas complétée
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de la note.");
      }
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setShowAllNotes(false);
      toast.success("Note créée avec succès !");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    setLoading(true);
    try {
      const response = await fetch(`/notes/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la note.");
      }
      const updatedNoteFromServer = await response.json();
      setNotes(
        notes.map((note) =>
          note.id === updatedNote.id ? updatedNoteFromServer : note
        )
      );
      setSelectedNote(updatedNoteFromServer);
      toast.success("Note mise à jour avec succès !");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);
    try {
      await fetch(`/notes/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== id));
      setSelectedNote(null);
      toast.success("Note supprimée avec succès !");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handlePinNote = async () => {
    setLoading(true);
    try {
      const updatedNote = {
        ...selectedNote,
        pinned: !selectedNote.pinned,
      };

      const response = await fetch(`/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'épinglage de la note.");
      }

      const updatedNoteFromServer = await response.json();
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id ? updatedNoteFromServer : note
        )
      );
      setSelectedNote(updatedNoteFromServer);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleToggleNoteCompletion = async (noteId) => {
    setLoading(true);
    try {
      const updatedNote = {
        ...notes.find((note) => note.id === noteId),
        completed: !notes.find((note) => note.id === noteId).completed,
      };

      const response = await fetch(`/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error("Erreur lors du basculement de l'état de la note.");
      }

      const updatedNoteFromServer = await response.json();
      setNotes(
        notes.map((note) => (note.id === noteId ? updatedNoteFromServer : note))
      );
      setSelectedNote(updatedNoteFromServer);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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
    handlePinNote,
    handleToggleNoteCompletion,
  };
}
