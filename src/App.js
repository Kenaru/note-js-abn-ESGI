import React, { useState, useEffect } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import NoteEditor from "./components/NoteEditor";
import Loader from "./components/Loader";
import { useNotes } from "./components/useNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "./components/apiUtils";

// Fonction principale de l'application
function App() {
  // Utilisation du hook custom 'useNotes' pour gérer les notes
  const {
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
  } = useNotes();

  // Utilisation du hook 'useState' pour gérer le mode sombre
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Utilisation du hook 'useState' pour gérer le nom de l'utilisateur
  const [userName, setUserName] = useState("");

  // Fonction pour basculer entre le mode sombre et le mode clair
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Effet de chargement initial pour récupérer le profil de l'utilisateur
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fonction asynchrone pour récupérer le profil de l'utilisateur
  const fetchUserProfile = async () => {
    try {
      const profileData = await fetchData("/profile");
      console.log("User profile data:", profileData);
      setUserName(profileData.name);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Rendu de l'application
  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="App-header">
        <h1>Notes :</h1>
        <div className="status-bar">User: {userName}</div>{" "}
        {/* Affichage du nom de l'utilisateur */}
        <button
          onClick={toggleDarkMode}
          className={`mode-toggle-button ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <ToastContainer position="bottom-right" />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="form-container">
              {/* Formulaire pour créer une nouvelle note */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  const content = e.target.content.value;
                  handleCreateNewNote(title, content);
                  e.target.reset();
                }}
              >
                <input type="text" name="title" placeholder="Titre" required />
                <textarea
                  name="content"
                  placeholder="Contenu"
                  className="resize_none"
                  required
                ></textarea>
                <button type="submit">Créer une note</button>
              </form>
            </div>
            {/* Affichage des notes */}
            <NotesContainer
              notes={notes}
              showAllNotes={showAllNotes}
              handleNoteClick={handleNoteClick}
              handleShowAllNotes={handleShowAllNotes}
              handlePinNote={handlePinNote}
              handleToggleNoteCompletion={handleToggleNoteCompletion}
            />
            {/* Éditeur de note (si une note est sélectionnée) */}
            {selectedNote && (
              <NoteEditor
                selectedNote={selectedNote}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
                handleShowAllNotes={handleShowAllNotes}
                showAllNotes={showAllNotes}
                handlePinNote={handlePinNote}
              />
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
