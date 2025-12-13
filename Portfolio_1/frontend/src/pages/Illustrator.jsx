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
    <div className="w-full h-[500px] flex flex-col gap-6 p-6">
      {illustratorData.map((item, index) => {
        const images = [item.image1, item.image2, item.image3, item.image4, item.image5, item.image6];

        return (
          <div
            key={index}
            className="h-full flex overflow-x-auto space-x-4 p-4 rounded-lg hide-scrollbar"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="shrink-0 w-[24rem] h-full border rounded-lg flex items-center justify-center p-4 bg-gray-100 cursor-pointer hover:scale-105 transition-transform"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6  w-[80%] h-[70%] relative ">
            <div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <MdCancel className="text-2xl"/>
            </button>
            </div>
            <div className=" w-full h-full flex flex-row">
            <div className=" w-[50%] h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-80 object-contain rounded-lg mb-4"
            />
            </div>
            <div className=" w-50% h-full p-2">
            <p className="text-gray-700">
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