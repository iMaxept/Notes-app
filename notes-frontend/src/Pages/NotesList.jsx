import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesListItem from "../Components/NotesListItem";
import NotesTileItem from "../Components/NotesTileItem";
import Header from "../Components/Header";
import { AnimatePresence, motion } from "motion/react";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [viewChange, setViewChange] = useState(false);

  const handleViewChange = () => {
    setViewChange(!viewChange);
  };

  const filteredNotes = notes.filter((note) =>
    (note.title || note.body || "").toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("/data/notes");
      console.log("Fetched data: ", response.data);
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Header
        setQuery={setQuery}
        handleViewChange={handleViewChange}
        viewChange={viewChange}
      ></Header>
      <AnimatePresence mode="wait">
        {viewChange ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="h-auto w-full flex flex-col items-center"
          >
            {filteredNotes.map((note) => (
              <NotesListItem key={note.id} note={note}>
                {note.body || note.content || JSON.stringify(note)}
              </NotesListItem>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="tile-view"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-y-10 gap-x-5 items-center w-full h-auto md:grid md:grid-cols-2 md:auto-rows-max lg:grid-cols-4"
          >
            {filteredNotes.map((note) => (
              <NotesTileItem key={note.id} note={note}>
                {note.body || note.content || JSON.stringify(note)}
              </NotesTileItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesList;
