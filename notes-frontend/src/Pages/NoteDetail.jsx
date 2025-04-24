import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faTrash,
  faArrowLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ReactTyped } from "react-typed";
import { AnimatePresence, motion } from "motion/react";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [editable, setEditable] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleShowDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  };

  const makeEditable = () => {
    if (!editable && note) {
      setTitle(note.title);
      setBody(note.body);
    }
    setEditable(!editable);
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`/data/notes/${id}/`);
        setNote(response.data);
      } catch (error) {
        console.log("Error fetching note:", error);
        console.log(error.response?.data);
        console.log(error.stack);
      }
    };
    getNote();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title,
        body,
      };

      await axios.put(`/data/notes/${id}/`, data);
      setNote({ ...note, title, body });
      navigate("/");
    } catch (error) {
      console.log("Error updating note:", error);
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/data/notes/${id}/`);
      navigate("/");
    } catch (error) {
      console.log("Error deleting note: ", error);
      console.log(error.response?.data);
    }
  };

  if (!note)
    return (
      <ReactTyped
        strings={["Loading."]}
        typeSpeed={130}
        backSpeed={140}
        fadeOut={true}
        loopCount={5}
        backDelay={2000}
        loop
        className="text-3xl text-[#F27999] font-bold font-mono p-3.5"
      />
    );

  return (
    <AnimatePresence mode="wait">
      {showDeleteDialog ? (
        <motion.div
          key="dialog-shown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center w-screen h-screen bg-[#2626269a] absolute z-10">
            <section className="flex flex-col items-center justify-center w-200 h-120 rounded-md border-4 border-[#F27999] bg-[#383838]">
              <p className="text-4xl mb-10 text-[#F27999]">
                Are you sure you want to delete this note?
              </p>
              <div>
                <FontAwesomeIcon
                  title="Confirm delete"
                  onClick={handleDelete}
                  className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                  icon={faCheck}
                  size="4x"
                />
                <FontAwesomeIcon
                  title="Cancel"
                  onClick={handleShowDeleteDialog}
                  className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                  icon={faXmark}
                  size="4x"
                />
              </div>
            </section>
          </div>
          <div className="blur-md">
            <div className="flex justify-between relative z-0 items-center w-full h-20 bg-[#383838] shadow-md mb-8">
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
              <Link to="/">
                <FontAwesomeIcon
                  title="Return to dashboard"
                  className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                  icon={faArrowLeft}
                  size="4x"
                />
              </Link>
            </div>
            {!editable ? (
              <form className="flex flex-col items-center">
                <input
                  className="w-7/10 h-15 p-3 text-3xl tracking-wider text-[#f2d98d] placeholder:text-[#F27999] border-b-2 border-gray-500 duration-400 outline-none mb-5 caret-transparent"
                  type="text"
                  value={note.title}
                  contentEditable={false}
                />
                <textarea
                  className="w-7/10 h-150 p-3 text-xl tracking-wide text-[#f2d98d] resize-none placeholder:text-[#F27999] border-x-2 border-gray-500 duration-400 outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#8c3e69] scroll-smooth caret-transparent"
                  value={note.body}
                  contentEditable={false}
                ></textarea>
                <section className="flex justify-center items-center w-7/10 h-20">
                  <FontAwesomeIcon
                    title="Update note"
                    onClick={makeEditable}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faSquarePen}
                    size="4x"
                  />
                  <FontAwesomeIcon
                    title="Delete note"
                    onClick={handleDelete}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faTrash}
                    size="4x"
                  />
                </section>
              </form>
            ) : (
              <form className="flex flex-col items-center">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#3b3b3b] rounded-sm w-7/10 h-15 p-3 text-3xl tracking-wider text-[#f2d98d] placeholder:text-[#F27999] border-b-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none mb-5"
                  type="text"
                />
                <textarea
                  onChange={(e) => setBody(e.target.value)}
                  className="bg-[#3b3b3b] rounded-sm w-7/10 h-150 p-3 text-xl tracking-wide text-[#f2d98d] resize-none placeholder:text-[#F27999] border-x-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#8c3e69] scroll-smooth"
                ></textarea>
                <section className="flex justify-center items-center w-7/10 h-20">
                  <FontAwesomeIcon
                    title="Confirm update"
                    onClick={handleEdit}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faCheck}
                    size="4x"
                  />
                  <FontAwesomeIcon
                    title="Cancel"
                    onClick={makeEditable}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faXmark}
                    size="4x"
                  />
                </section>
              </form>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="dialog-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div className="flex justify-between relative z-0 items-center w-full h-20 bg-[#383838] shadow-md mb-8">
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
              <Link to="/">
                <FontAwesomeIcon
                  title="Return to dashboard"
                  className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                  icon={faArrowLeft}
                  size="4x"
                />
              </Link>
            </div>
            {!editable ? (
              <form className="flex flex-col items-center">
                <input
                  className="w-7/10 h-15 p-3 text-3xl tracking-wider text-[#f2d98d] placeholder:text-[#F27999] border-b-2 border-gray-500 duration-400 outline-none mb-5 caret-transparent"
                  type="text"
                  value={note.title}
                  contentEditable={false}
                />
                <textarea
                  className="w-7/10 h-150 p-3 text-xl tracking-wide text-[#f2d98d] resize-none placeholder:text-[#F27999] border-x-2 border-gray-500 duration-400 outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#8c3e69] scroll-smooth caret-transparent"
                  value={note.body}
                  contentEditable={false}
                ></textarea>
                <section className="flex justify-center items-center w-7/10 h-20">
                  <FontAwesomeIcon
                    title="Update note"
                    onClick={makeEditable}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faSquarePen}
                    size="4x"
                  />
                  <FontAwesomeIcon
                    title="Delete note"
                    onClick={handleShowDeleteDialog}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faTrash}
                    size="4x"
                  />
                </section>
              </form>
            ) : (
              <form className="flex flex-col items-center">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#3b3b3b] rounded-sm w-7/10 h-15 p-3 text-3xl tracking-wider text-[#f2d98d] placeholder:text-[#F27999] border-b-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none mb-5"
                  type="text"
                />
                <textarea
                  onChange={(e) => setBody(e.target.value)}
                  className="bg-[#3b3b3b] rounded-sm w-7/10 h-150 p-3 text-xl tracking-wide text-[#f2d98d] resize-none placeholder:text-[#F27999] border-x-2 border-gray-500 focus:border-[#F27999] focus:border-dashed duration-400 outline-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#8c3e69] scroll-smooth"
                ></textarea>
                <section className="flex justify-center items-center w-7/10 h-20">
                  <FontAwesomeIcon
                    title="Confirm update"
                    onClick={handleEdit}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faCheck}
                    size="4x"
                  />
                  <FontAwesomeIcon
                    title="Cancel"
                    onClick={makeEditable}
                    className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                    icon={faXmark}
                    size="4x"
                  />
                </section>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteDetail;
