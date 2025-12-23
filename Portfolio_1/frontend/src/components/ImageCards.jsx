import React, { useState } from "react";
import CreativeNav from "./CreativeNav";
import Photoshop from "../pages/Photoshop";
import Illustrator from "../pages/Illustrator";
import PremierePro from "../pages/PremierePro";
import AfterEffects from "../pages/AfterEffects";
import Maya from "../pages/Maya";

function ImageCards() {
  const [activeTab, setActiveTab] = useState("photoshop");

  // Determine which component to render based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "photoshop":
        return <Photoshop />;
      case "illustrator":
        return <Illustrator />;
      case "premiere-pro":
        return <PremierePro />;
      case "after-effects":
        return <AfterEffects />;
      case "corel-draw":
        return <Maya/>;
      default:
        return <Photoshop />;
    }
  };

  return (
    <div className="ImageCards-container min-h-[350px] sm:min-h-[400px] md:h-[500px] w-full flex items-center justify-center mt-4 sm:mt-6 md:mt-10 px-3 sm:px-4">
      <div className="h-full w-full sm:w-[95%] md:w-[90%] p-2 sm:p-3 md:p-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">All in a single creative suite</h1>

        <CreativeNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        ></CreativeNav>

        <div className="mt-3 sm:mt-4 md:mt-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ImageCards;
