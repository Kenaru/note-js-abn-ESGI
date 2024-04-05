import React from "react";
import "./App.css";
import NotesContainer from "./components/NotesContainer";
import NoteEditor from "./components/NoteEditor";
import Loader from "./components/Loader";
import { useNotes } from "./components/useNotes";

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
  } = useNotes();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes :</h1>
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
            />
            {selectedNote && (
              <NoteEditor
                selectedNote={selectedNote}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
                handleShowAllNotes={handleShowAllNotes}
                showAllNotes={showAllNotes}
              />
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;