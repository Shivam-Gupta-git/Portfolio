import React, { useState, useEffect } from "react";

const Carousel = () => {
  // Each box now has: { title, image, link }
  const sections = [
    [
      { title: "Maya", image: "/images/maya2.jpeg", link: "#" },
      { title: "Photoshop", image: "/images/photoshop5.jpeg", link: "#" },
      { title: "Photoshop", image: "/images/photoshop6.jpeg", link: "#" },
      { title: "Maya", image: "/images/maya3.jpeg", link: "#" },
    ],
    [
      { title: "Illustrator", image: "/images/Illustrator4.jpeg", link: "#" },
      { title: "Illustrator", image: "/images/Illustrator2.jpeg", link: "#" },
      { title: "Photoshop", image: "/images/photoShop1.jpeg", link: "#" },
      { title: "Maya", image: "/images/maya7.jpeg", link: "#" },
    ],
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
    
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
    
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);

  const handlePrev = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
    setHoveredIndex(null);
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
    setHoveredIndex(null);
  };

  return (
    <div className="w-full flex items-center justify-center mt-12 sm:mt-20 md:mt-35 flex-col px-3 sm:px-4">
      <div className="w-full sm:w-[95%] md:w-[90%] min-h-[50px] sm:min-h-[60px] md:h-[100px] flex items-center mt-4 sm:mt-6 md:mt-10">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center leading-tight px-2">A Passionate BFA Student Crafting Visual Narratives</h1>
      </div>

      <div className="w-full sm:w-[95%] md:w-[85%] mx-auto py-6 sm:py-10 relative">
        <div className="flex gap-2 sm:gap-4 justify-end mb-4 sm:mb-0 lg:mb-3">
          <button
            onClick={handlePrev}
            className="bg-gray-700 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-gray-800 transition text-lg sm:text-xl"
            aria-label="Previous"
          >
        &#8592;
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-700 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-gray-800 transition text-lg sm:text-xl"
            aria-label="Next"
          >
        &#8594;
          </button>
        </div>

        <div className="flex gap-2 sm:gap-4 overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
          {sections[currentSection].map((box, index) => (
            <a
              key={index}
              href={box.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setHoveredIndex(null)}
              className={`shrink-0 w-[200px] sm:w-[250px] md:flex-1 md:h-[350px] lg:h-[400px] xl:h-[450px] h-[250px] sm:h-[300px] rounded-lg cursor-pointer overflow-hidden relative shadow-lg transition-all duration-500 border`}
              style={{
                flex: 
                   (hoveredIndex === null ? 1 : hoveredIndex === index ? 3 : 0.8)
                
              }}
            >
              {/* Image */}
              <img
                src={box.image}
                alt={''}
                className="w-full h-full object-cover"
              />
              {/* Title overlay */}
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-1.5 sm:py-2 font-semibold text-xs sm:text-sm md:text-base">
                {box.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

// flex: !isMobile ? (hoveredIndex === null ? 1 : hoveredIndex === index ? 3 : 0.8) : undefine