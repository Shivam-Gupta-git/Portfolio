import React from 'react'
import { CgMail } from "react-icons/cg";
import { IoIosContact } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { BsCCircle } from "react-icons/bs";

function Footer() {
  return (
    <div className='w-full mt-16 sm:mt-20 bg-white/5 px-3 sm:px-6'>

      {/* TOP SERVICES */}
      <div className='flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-3 sm:gap-0 text-center'>
        <span className='text-base sm:text-lg md:text-xl font-normal mt-4'>
          ANIMATIONS & ILLUSTRATION
        </span>
        <span className='text-base sm:text-lg md:text-xl font-normal mt-4'>
          GRAPHIC CREATIVES
        </span>
        <span className='text-base sm:text-lg md:text-xl font-normal mt-4'>
          VIDEO EDITING
        </span>
      </div>

      <hr className='mt-4 opacity-40' />

      {/* SOCIAL ICONS */}
      <div className='w-full mt-6 flex flex-wrap justify-center items-center gap-4 sm:gap-5'>
        <a href="#" className='bg-white/15 p-2 rounded-full hover:shadow-sm shadow-gray-300 duration-300'>
          <CgMail className='text-2xl sm:text-3xl' />
        </a>
        <a href="#" className='bg-white/15 p-2 rounded-full hover:shadow-sm shadow-gray-300 duration-300'>
          <IoIosContact className='text-2xl sm:text-3xl' />
        </a>
        <a href="#" className='bg-white/15 p-2 rounded-full hover:shadow-sm shadow-gray-300 duration-300'>
          <FaWhatsapp className='text-2xl sm:text-3xl' />
        </a>
        <a href="#" className='bg-white/15 p-2 rounded-full hover:shadow-sm shadow-gray-300 duration-300'>
          <CiLinkedin className='text-2xl sm:text-3xl' />
        </a>
        <a href="#" className='bg-white/15 p-2 rounded-full hover:shadow-sm shadow-gray-300 duration-300'>
          <FaInstagram className='text-2xl sm:text-3xl' />
        </a>
      </div>

      {/* LINKS */}
      <div className='w-full mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg text-center'>
        <span>Terms & Condition</span>
        <span className="hidden sm:inline">|</span>
        <span>Privacy Policy</span>
        <span className="hidden sm:inline">|</span>
        <span>Disclosures</span>
      </div>

      {/* COPYRIGHT */}
      <div className='w-full flex items-center justify-center gap-1 mt-6 pb-6 text-sm sm:text-base'>
        <BsCCircle />
        <p>All Rights Reserved</p>
      </div>

    </div>
  )
}

export default Footer