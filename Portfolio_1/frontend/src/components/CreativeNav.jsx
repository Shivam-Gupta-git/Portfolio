import React from 'react'

function CreativeNav({ activeTab, setActiveTab }) {
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4 mt-4 sm:mt-6 md:mt-10 overflow-x-auto hide-scrollbar ">
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 min-w-max">
        <button 
          onClick={() => handleClick('photoshop')}
          className={`${activeTab === 'photoshop' ? 'bg-white/20 text-white' : 'bg-transparent'} text-gray-500 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[7px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] cursor-pointer transition-all whitespace-nowrap`}>
          PhotoShop
        </button>

        <button 
          onClick={() => handleClick('illustrator')}
          className={`${activeTab === 'illustrator' ? 'bg-white/20 text-white' : 'bg-transparent'} text-gray-500 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[7px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] cursor-pointer transition-all whitespace-nowrap`}>
          Illustrator
        </button>

        <button 
          onClick={() => handleClick('premiere-pro')}
          className={`${activeTab === 'premiere-pro' ? 'bg-white/20 text-white' : 'bg-transparent'} text-gray-500 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[7px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] cursor-pointer transition-all whitespace-nowrap`}>
          Premiere Pro
        </button>

        <button 
          onClick={() => handleClick('after-effects')}
          className={`${activeTab === 'after-effects' ? 'bg-white/20 text-white' : 'bg-transparent'} text-gray-500 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[7px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] cursor-pointer transition-all whitespace-nowrap`}>
          After Effects
        </button>

        <button 
          onClick={() => handleClick('corel-draw')}
          className={`${activeTab === 'corel-draw' ? 'bg-white/20 text-white' : 'bg-transparent'} text-gray-500 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[7px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] cursor-pointer transition-all whitespace-nowrap`}>
          Maya
        </button>
      </div>
    </div>
  )
}

export default CreativeNav