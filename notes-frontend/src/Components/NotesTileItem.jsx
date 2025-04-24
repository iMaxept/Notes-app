import { Link } from "react-router-dom";
import React from "react";

const NotesTileItem = ({ note }) => {
  return (
    <Link to={`/notes/${note.id}`} className="max-h-50 place-items-center">
      <section
        title="Click to see whole note"
        className="flex flex-col p-1 rounded-md w-100 h-50 bg-[#f2d98d] border-2 border-[#f2307b] hover:scale-115 hover:cursor-pointer duration-300"
      >
        <p className="text-[#8c3e69] text-2xl font-bold">{note.title}</p>
        <p className="text-[#f27999]">
          Created at {note.created.substr(0, 10)}
        </p>
        <section className="text-[#0d0d0d] truncate text-wrap h-25 ">
          {note.body}
        </section>
      </section>
    </Link>
  );
};

export default NotesTileItem;
