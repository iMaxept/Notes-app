import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import NotesList from "./Pages/NotesList";
import NoteDetail from "./Pages/NoteDetail";
import CreateNote from "./Pages/CreateNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={NotesList} />
        <Route path="/notes/:id" Component={NoteDetail} />
        <Route path="/notes/create" Component={CreateNote} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
