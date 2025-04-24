import React from "react";
import { Link } from "react-router-dom";

const NotesListItem = ({ note }) => {
  return (
    <Link
      title="Click to see whole note"
      to={`/notes/${note.id}`}
      className="w-7/10 h-40 m-1 p-2 border-6 rounded-md border-[#383838] hover:border-[#F27999] duration-500 hover:cursor-pointer"
    >
      <p className="text-[#f27999] text-2xl font-bold">{note.title}</p>
      <p className="text-[#8c3e69]">Created at {note.created.substr(0, 10)}</p>
      <section className="text-[#f2d98d] truncate text-wrap h-25 mt-2">
        {note.body}
      </section>
    </Link>
  );
};

export default NotesListItem;
