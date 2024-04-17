//App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import NoteEditor from "./components/NoteEditor";
import Loader from "./components/Loader";
import { useNotes } from "./components/useNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "./components/apiUtils"; 

function App() {
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

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userName, setUserName] = useState("") // State to store user's name

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
      fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profileData = await fetchData("/profile"); // Utilisation de fetchData
      console.log("User profile data:", profileData);
      setUserName(profileData.name); // Set user's name to state
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="App-header">
        <h1>Notes :</h1>
        <div className="status-bar">User: {userName}</div> {/* Display user's name */}
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
            <NotesContainer
              notes={notes}
              showAllNotes={showAllNotes}
              handleNoteClick={handleNoteClick}
              handleShowAllNotes={handleShowAllNotes}
              handlePinNote={handlePinNote}
              handleToggleNoteCompletion={handleToggleNoteCompletion}
            />
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
