import React from "react";
import Scene from "./animeChracter/Cute_cartoon_girl_character";
import { softwareLogo } from "../components/data";
import { CgMail } from "react-icons/cg";
import { IoIosContact } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-2 sm:px-4">
      {/* Hero Section */}
      <div className="relative mx-auto h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mb-4 sm:mb-6 md:mb-8">
        {/* TOP TITLE */}
        <div className="w-full h-[15%] sm:h-[12%] flex items-end justify-end">
          <h1 className="font-bold mac-glow-text text-xs sm:text-sm md:text-base lg:text-[18px] pr-2 sm:pr-6 md:pr-10">
            DESIGNER
          </h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full h-[85%] sm:h-[88%] relative flex flex-row items-start justify-center">
          {/* TEXT */}
          <div className="w-full flex flex-row justify-between px-1 sm:px-2">
            <span
              className="inline-block mac-glow-text text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-none mt-10"
              style={{ transform: "scaleY(1.9)" }}
            >
              PORT
            </span>
            <span
              className="inline-block mac-glow-text text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-none mt-10"
              style={{ transform: "scaleY(1.9)" }}
            >
              FOLIO
            </span>
          </div>

          {/* CENTER OBJECT / SCENE HOLDER */}
          <div className="absolute bottom-12 sm:bottom-4 left-1/2 -translate-x-1/2 sm:left-[35%] sm:translate-x-0 md:left-[38%] lg:left-[40%] w-[35%] sm:w-[28%] md:w-[22%] lg:w-[18%] xl:w-[15%] h-full">
            <Scene></Scene>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="w-[95%] sm:w-[90%] min-h-[60px] sm:h-[85px] md:h-[100px] flex flex-col justify-center mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500">
          INTRODUCTION
        </h1>
        <h3 className="text-sm sm:text-base md:text-lg text-gray-400">
          About Me
        </h3>
      </div>

      {/* About Content Section */}
      <div className="w-[95%] sm:w-[90%] min-h-[400px] sm:min-h-[350px] md:h-[350px] flex flex-col md:flex-row gap-4 md:gap-0 mb-6 sm:mb-8">
        <div className="h-[200px] sm:h-[250px] md:h-full w-full md:w-[20%] relative flex items-center justify-center md:justify-start">
          <div className="w-[90%] h-[80%] bg-gray-400 rounded-xl sm:rounded-2xl"></div>
        </div>
        <div className="h-full w-full md:w-[80%] p-2 sm:p-3 flex flex-col justify-between">
          <div className="w-full md:w-[90%] min-h-[100px] sm:h-[120px] bg-white/15 rounded-xl sm:rounded-2xl p-3 -mt-3">
            <h1 className="text-[8px] sm:text-[11px] md:text-[12px] leading-relaxed mt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              libero pariatur minus nisi reprehenderit reiciendis provident
              ipsum distinctio, eveniet quo aperiam atque, id veniam hic
              corrupti culpa quas fuga quaerat labore! Quas dolore molestias
              laboriosam totam tempora recusandae dignissimos sed? Doloremque
              excepturi iure nulla explicabo suscipit adipisci illum placeat
              ipsam.
            </h1>
          </div>
          <div className="w-full md:w-[90%] min-h-[120px] sm:h-[120px] flex flex-row items-start justify-around flex-wrap sm:flex-nowrap gap-2 sm:gap-0 mt-3">
            {softwareLogo.map((item, index) => {
              const logos = [
                item.image1,
                item.image2,
                item.image3,
                item.image4,
                item.image5,
              ];
              const headings = [
                item.heading1,
                item.heading2,
                item.heading3,
                item.heading4,
                item.heading5,
              ];

              return (
                <div
                  key={index}
                  className="w-full flex flex-row justify-around items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-0"
                >
                  {logos.map((itemLogo, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <img
                        src={itemLogo}
                        alt={`box-${i}`}
                        className="w-[45px] h-[45px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] shadow-sm rounded-xl sm:rounded-2xl md:rounded-3xl shadow-gray-400 hover:scale-75 duration-300"
                      />
                      {headings[i] && (
                        <span className="text-white text-[9px] sm:text-[10px] md:text-sm mt-1 sm:mt-2 font-medium text-center">
                          {headings[i]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact and Experience Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  {/* CONTACT SECTION */}
  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 shadow-md">
    <h1 className="inline-block bg-white/15 px-6 py-1 rounded-full text-sm sm:text-base font-medium mb-4">
      CONTACT
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {[
        { icon: <CgMail />, label: "Email" },
        { icon: <IoIosContact />, label: "Contact" },
        { icon: <FaWhatsapp />, label: "WhatsApp" },
        { icon: <CiLinkedin />, label: "LinkedIn" },
        { icon: <FaInstagram />, label: "Instagram" },
      ].map((item, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 duration-300 shadow-sm hover:shadow-gray-400"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-gray-300 text-sm sm:text-base">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  </div>

  {/* INTEREST + EXPERIENCE */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {/* INTEREST */}
    <div className="md:col-span-1 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-md">
      <h1 className="inline-block bg-white/15 px-6 py-1 rounded-full text-sm sm:text-base font-medium mb-4">
        INTEREST
      </h1>

      <div className="flex flex-wrap gap-2">
        {["Painting", "Book Reading"].map((interest, i) => (
          <span
            key={i}
            className="px-3 py-1 border border-white/20 rounded-full text-xs sm:text-sm text-gray-300"
          >
            #{interest}
          </span>
        ))}
      </div>
    </div>

    {/* EXPERIENCE */}
    <div className="md:col-span-3 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-md">
      <h1 className="inline-block bg-white/15 px-6 py-1 rounded-full text-sm sm:text-base font-medium mb-3">
        EXPERIENCE
      </h1>

      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
        I am currently a college student and do not have professional experience
        yet. However, I am actively learning modern web technologies and building
        projects to enhance my practical skills.
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default About;
