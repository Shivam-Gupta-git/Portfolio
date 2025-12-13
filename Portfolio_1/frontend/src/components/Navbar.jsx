import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoSearch, IoBagOutline } from "react-icons/io5";
import { FaRegUser, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCollections } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handelCloseSidebar = () => {
    setSidebarOpen(false)
  }

  // NavLinks......
  const navLinks = (
    <>
      <NavLink to="/" className={({isActive}) => `${isActive ? 'text-blue-400' : 'text-white'}  hover:text-blue-400 transition font-light`}>
        Home
      </NavLink>
      <NavLink
        to="/Work"

        className={({isActive}) => `${isActive ? 'text-blue-400' : 'text-white'}  hover:text-blue-400 transition font-light`}
      >
        Work
      </NavLink>
      <NavLink
        to="/About"
        className={({isActive}) => `${isActive ? 'text-blue-400' : 'text-white'}  hover:text-blue-400 transition font-light`}
      >
        About
      </NavLink>
      <NavLink
        to="/Contact"
        className={({isActive}) => `${isActive ? 'text-blue-400' : 'text-white'}  hover:text-blue-400 transition font-light`}
      >
        Contact
      </NavLink>
    </>
  );

  // SideBar Nav Links.....
  const sidebarLinks = (
    <>
      <NavLink
        to="/"
        onClick={handelCloseSidebar}
        className="h-[41px] text-white py-3 px-4  hover:bg-gray-900 hover:text-blue-400 transition-all duration-300  flex flex-row items-center gap-2"
      >
        <IoHomeOutline />
        Home
      </NavLink>

      <NavLink
        to="/Work"
        onClick={handelCloseSidebar}
        className="h-[41px] text-white py-3 px-4  hover:bg-gray-900 hover:text-blue-400 transition-all duration-300 flex flex-row items-center gap-2"
      >
        <MdOutlineCollections />
        Work
      </NavLink>

      <NavLink
        to="/About"
        onClick={handelCloseSidebar}
        className="h-[41px] text-white py-3 px-4  hover:bg-gray-900 hover:text-blue-400 transition-all duration-300 flex flex-row items-center gap-2"
      >
        <AiOutlineInfoCircle />
        About
      </NavLink>
      <NavLink
        to="/Contact"
        onClick={handelCloseSidebar}
        className="h-[41px] text-white py-3 px-4  hover:bg-gray-900 hover:text-blue-400 transition-all duration-300 flex flex-row items-center gap-2"
      >
        <IoIosContact/>
        <p>Contact</p>
      </NavLink>
    </>
  );

  return (
    <>
      <nav
        ref={dropDownRef}
        className="w-full h-[50px] shadow-md sticky top-0 z-50 bg-white/15"
      >
        {/*  Main Container */}
        <div className="max-w-7xl h-full mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="lg:w-[10%] w-[30%] sm:w-[20%] h-full flex items-center justify-center gap-2 ">
            <Link to={'/'} className=" text-blue-500 font-bold xl:text-xl ">
              Portfolio
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="w-[90%] h-full justify-center items-center hidden md:flex gap-8 ">
            {navLinks}
          </div>

          {/* Search User and Bars Section */}
          <div className="md:hidden flex items-center gap-5 relative">
            {/* Hamburger Icon */}
            <div
              className="md:hidden text-white text-2xl cursor-pointer"
              onClick={toggleSidebar}
            >
              {!sidebarOpen ? <FaBars /> : null}
            </div>
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-[50%] bg-gray-800 z-40 transform transition-transform duration-700  ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div className=" h-[50px] py-5 relative flex flex-row  items-center ">
            <div className="text-blue-500 font-bold xl:text-xl">
              Portfolio
            </div>
            <div onClick={toggleSidebar}>
              {sidebarOpen ? (
                <MdOutlineCancel
                  className="text-black absolute right-5 top-3 cursor-pointer hover:bg-blue-300 hover:text-white transition-all duration-300 text-3xl font-light  rounded-2xl mt-2
          "
                />
              ) : null}
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-4">{sidebarLinks}</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
