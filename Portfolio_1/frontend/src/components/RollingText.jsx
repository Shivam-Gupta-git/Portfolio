import React from "react";

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

  return (
    <div className="w-full overflow-hidden relative -mt-3 sm:-mt-5 z-20 flex items-center justify-center py-3 sm:py-4 md:py-6">
      <div className="w-[98%] sm:w-[95%] md:w-[90%] overflow-hidden flex items-center">
        
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
    </div>
  );
}

export default RollingText;