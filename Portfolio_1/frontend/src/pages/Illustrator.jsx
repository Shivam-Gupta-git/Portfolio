import React, { useState } from "react";
import { illustratorData } from "../components/data";
import { MdCancel } from "react-icons/md";

function Photoshop() {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isOpen, setIsOpen] = useState(false); 

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div className="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
      {illustratorData.map((item, index) => {
        const images = [
          item.image1, 
          item.image2, 
          item.image3, 
          item.image4, 
          item.image5, 
        
        ];

        return (
          <div
            key={index}
            className="w-full flex overflow-x-auto space-x-3 sm:space-x-4 p-2 sm:p-4 rounded-lg hide-scrollbar"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="shrink-0 
                w-[300px] h-[350px]
                sm:w-[300px] sm:h-[400px]
                md:w-[300px] md:h-[400px]
                lg:w-[400px] lg:h-[400px]
                border rounded-lg flex items-center justify-center p-2 sm:p-4 
                bg-gray-100 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openModal(img)} 
              >
                <img
                  src={img}
                  alt={`box-${i}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        );
      })}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3 sm:px-6">
          <div className="bg-white rounded-lg relative 
            w-full sm:w-[90%] md:w-[80%] lg:w-[70%]
            h-auto md:h-[70%]
            p-4 sm:p-6">
            <div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <MdCancel className="text-2xl sm:text-3xl"/>
            </button>
            </div>
            <div className="w-full h-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 h-[220px] sm:h-[280px] md:h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain rounded-lg"
            />
            </div>
            <div className="w-full md:w-1/2 h-auto md:h-full p-2 sm:p-4 flex items-start">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Here you can describe this image. You can fetch description from your backend.
            </p>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photoshop;