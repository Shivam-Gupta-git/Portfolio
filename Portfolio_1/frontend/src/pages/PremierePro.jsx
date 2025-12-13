import React from 'react'

function PremierePro() {
  return (
    <div className="w-full h-[500px] flex flex-col gap-6 p-6">
    {/* Container 1 */}
    <div className="h-full flex overflow-x-auto space-x-4 p-4  rounded-lg hide-scrollbar">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-98 h-full border rounded-lg flex items-center justify-center text-white text-xl"
        >
          Box {i + 1}
        </div>
      ))}
    </div>
  </div>
  )
}

export default PremierePro

