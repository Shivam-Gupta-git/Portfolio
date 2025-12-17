import React, { useState, useEffect } from 'react'

const Works = () => {
  const [mediaItems, setMediaItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  // Load items from localStorage only (added via admin panel)
  useEffect(() => {
    const saved = localStorage.getItem('portfolioMedia')
    if (saved) {
      setMediaItems(JSON.parse(saved))
    }
  }, [])

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'photoshop', label: 'Photoshop' },
    { id: 'illustrator', label: 'Illustrator' },
    { id: 'premiere', label: 'Premiere Pro' },
    { id: 'aftereffects', label: 'After Effects' },
    { id: '3d', label: '3D Art' }
  ]

  const filteredItems = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen  from-gray-900 to-black text-white">
      {/* Header */}
      <div className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          My <span className="text-cyan-400">Work</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Explore my creative portfolio featuring video editing, 3D art, and graphic design projects
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 sm:px-6 md:px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 sm:px-6 md:px-8 pb-16">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg sm:text-xl">No works available yet</p>
            <p className="text-sm mt-2">Check back soon for new projects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-900 relative overflow-hidden">
                  {item.type === 'video' ? (
                    <>
                      {item.url.includes('youtube') ? (
                        <img 
                          src={`https://img.youtube.com/vi/${item.url.split('/').pop()}/mqdefault.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <video src={item.url} className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-cyan-500/80 transition-colors">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23374151" width="400" height="300"/><text fill="%239CA3AF" font-size="14" x="50%" y="50%" text-anchor="middle">Image not available</text></svg>';
                      }}
                    />
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] sm:text-xs uppercase">
                    {item.category}
                  </span>
                </div>
                
                {/* Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing media */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Media */}
            <div className="aspect-video bg-black">
              {selectedItem.type === 'video' ? (
                selectedItem.url.includes('youtube') || selectedItem.url.includes('vimeo') ? (
                  <iframe
                    src={selectedItem.url}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <video src={selectedItem.url} className="w-full h-full" controls autoPlay />
                )
              ) : (
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23374151" width="400" height="300"/><text fill="%239CA3AF" font-size="14" x="50%" y="50%" text-anchor="middle">Image not available</text></svg>';
                  }}
                />
              )}
            </div>
            
            {/* Info */}
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{selectedItem.title}</h2>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <span className="inline-block px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs sm:text-sm mb-3">
                {selectedItem.category}
              </span>
              <p className="text-gray-400 text-sm sm:text-base">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Works
