import React, { Children, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ReactTyped } from "react-typed";

const NoteDetail = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title,
        body,
      };
      if (!data.title || !data.body) {
        alert("Enter the title and note content");
        return;
      }

      await axios.post(`/data/notes/`, data);
      navigate("/");
    } catch (error) {
      console.log("Error creating note:", error);
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full h-20 bg-[#383838] shadow-md mb-8">
        <div className="w-1/2">
          <ReactTyped
            strings={["Notes."]}
            typeSpeed={130}
            backSpeed={140}
            fadeOut={true}
            loopCount={5}
            backDelay={2000}
            loop
            className="text-3xl text-[#F27999] font-bold font-mono p-3.5"
          />
        </div>
        <div className="flex flex-row-reverse w-1/2"></div>
      </div>
      <form className="flex flex-col items-center">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="w-7/10 h-15 p-3 text-3xl tracking-wider text-[#f2d98d] placeholder:text-[#F27999] border-b-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none mb-5"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          className="w-7/10 h-150 p-3 text-xl tracking-wide text-[#f2d98d] resize-none placeholder:text-[#F27999] border-x-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#8c3e69] scroll-smooth"
          placeholder="Enter your text here..."
        ></textarea>
        <section className="flex justify-center items-center w-7/10 h-20">
          <FontAwesomeIcon
            title="Create note"
            onClick={handleCreate}
            className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
            size={"4x"}
            icon={faSquarePlus}
          />
          <Link to="/">
            <FontAwesomeIcon
              title="Cancel"
              className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
              icon={faXmark}
              size="4x"
            />
          </Link>
        </section>
      </form>
    </div>
  );
};

export default NoteDetail;
