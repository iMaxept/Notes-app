import React from "react";
import { ReactTyped } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faMagnifyingGlass,
  faList,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const Header = ({ setQuery, handleViewChange, viewChange }) => {
  return (
    <div className="flex justify-between items-center w-full h-20 bg-[#383838] shadow-md mb-8">
      <section className="w-32">
        <ReactTyped
          strings={["Notes."]}
          typeSpeed={130}
          backSpeed={140}
          fadeOut={true}
          loopCount={5}
          backDelay={2000}
          loop
          className="text-3xl text-[#F27999] font-bold font-mono p-3.5 cursor-default"
        />
      </section>
      <section className="group flex justify-between rounded-md items-center w-150 h-13">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={"2x"}
          className="m-1 text-[#262626] group-has-focus:text-[#F27999] duration-400 "
        />
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          type="search"
          placeholder="Search..."
          className="h-13 w-140 p-1 text-[#F27999] text-2xl border-b-2 border-[#262626] focus:outline-none focus:border-[#F27999] focus:rounded-md focus:border-dashed duration-400 caret-[#F27999]"
        />
      </section>
      <section className="flex items-center h-20 w-50">
        <AnimatePresence mode="wait">
          {viewChange ? (
            <motion.div
              key="grip"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon
                onClick={handleViewChange}
                icon={faGrip}
                title="Change view"
                className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                size="5x"
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon
                onClick={handleViewChange}
                icon={faList}
                title="Change view"
                className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
                size="4x"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Link to="/notes/create">
          <FontAwesomeIcon
            title="Add note"
            className="text-[#F27999] p-4 hover:text-[#8c3e69] duration-300 hover:cursor-pointer"
            size={"4x"}
            icon={faSquarePlus}
          />
        </Link>
      </section>
    </div>
  );
};

export default Header;
