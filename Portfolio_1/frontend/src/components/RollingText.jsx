import React, { useState, useEffect } from "react";

function RollingText() {
  const skills = [
    "MAYA",
    "3DX MAX",
    "PREMIERE PRO",
    "AFTER EFFECT",
    "ADOBE PHOTOSHOP",
    "ADOBE ILLUSTRATOR",
    "COREL DRAW",
    "BLENDER",
  ];

  const [resume, setResume] = useState({
    resumeUrl: "", 
  })

  useEffect(() => {
    const saved = localStorage.getItem("resume");
    if (saved) {
      setResume(JSON.parse(saved));
    }
  }, []);

  const handleDownloadResume = () => {
    if (resume.resumeUrl) {
      window.open(resume.resumeUrl, "_blank");
    } else {
      alert("Resume not available yet");
    }
  };

  return (
    <div className="w-full overflow-hidden relative -mt-3 sm:-mt-5 z-20 flex flex-col items-center justify-center py-3 sm:py-4 md:py-6">
      <div className="w-[98%] sm:w-[95%] md:w-[90%] overflow-hidden flex items-center ">
        
        <div className="marquee-track">
          
          {/* 1st copy */}
          <div className="marquee-item">
            {skills.map((s) => (
              <span
                key={s}
                className="font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/50 inline-block"
              >
                {s}
              </span>
            ))}
          </div>

          {/* 2nd copy (duplicate for smooth loop) */}
          <div className="marquee-item">
            {skills.map((s) => (
              <span
                key={s + "_copy"}
                className="font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/50 inline-block"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

      </div>
      <div className="w-[90%] mt-3">
          {/* Resume Download Button */}
            <button
            onClick={handleDownloadResume}
            className=" sm:mt-5 px-4 sm:px-6 py-2 sm:py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-xs sm:text-sm md:text-base font-medium transition-all hover:scale-105 flex items-center gap-2"
          >
            Download Resume
          </button>
        </div>
    </div>
  );
}

export default RollingText;