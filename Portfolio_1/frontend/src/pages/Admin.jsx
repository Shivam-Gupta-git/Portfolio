import React, { useState, useEffect } from 'react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [mediaItems, setMediaItems] = useState([])
  const [homeSettings, setHomeSettings] = useState({
    resumeUrl: '',
    heroTitle: "Hi, I'm Ritu Kumari",
    heroSubtitle: "I'm a creative video editor and 3D artist",
    heroDescription: "who specializes in crafting cinematic visuals, realistic 3D models, and engaging motion stories."
  })
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'image',
    category: 'all'
  })
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('media') // 'media' or 'home'

  // Admin password - change this to your preferred password
  const ADMIN_PASSWORD = 'admin@123'

  // Check if already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolioMedia')
    if (saved) {
      setMediaItems(JSON.parse(saved))
    }
    
    const savedHome = localStorage.getItem('homeSettings')
    if (savedHome) {
      setHomeSettings(JSON.parse(savedHome))
    }
  }, [])

  // Save to localStorage whenever mediaItems changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('portfolioMedia', JSON.stringify(mediaItems))
    }
  }, [mediaItems, isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingId) {
      setMediaItems(prev => 
        prev.map(item => 
          item.id === editingId ? { ...formData, id: editingId } : item
        )
      )
      setEditingId(null)
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      setMediaItems(prev => [...prev, newItem])
    }
    
    setFormData({ title: '', description: '', url: '', type: 'image', category: 'all' })
    setShowForm(false)
  }

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      url: item.url,
      type: item.type,
      category: item.category
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMediaItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({ title: '', description: '', url: '', type: 'image', category: 'all' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleHomeSettingsSave = () => {
    localStorage.setItem('homeSettings', JSON.stringify(homeSettings))
    alert('Home settings saved successfully!')
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen  from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  from-gray-900 to-black text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'media' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Media Gallery
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Home Settings
          </button>
        </div>

        {/* Home Settings Tab */}
        {activeTab === 'home' && (
          <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Home Page Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Resume URL (PDF link)</label>
                <input
                  type="url"
                  value={homeSettings.resumeUrl}
                  onChange={(e) => setHomeSettings({ ...homeSettings, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/... or direct PDF link"
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={homeSettings.heroTitle}
                  onChange={(e) => setHomeSettings({ ...homeSettings, heroTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={homeSettings.heroSubtitle}
                  onChange={(e) => setHomeSettings({ ...homeSettings, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Hero Description</label>
                <textarea
                  value={homeSettings.heroDescription}
                  onChange={(e) => setHomeSettings({ ...homeSettings, heroDescription: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
                />
              </div>
              
              <button
                onClick={handleHomeSettingsSave}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors text-sm sm:text-base"
              >
                {showForm ? 'Close Form' : '+ Add New Media'}
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="bg-gray-800/50 p-4 sm:p-6 rounded-xl mb-8 backdrop-blur-sm">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  {editingId ? 'Edit Media' : 'Add New Media'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Media Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                    >
                      <option value="all">All</option>
                      <option value="photoshop">Photoshop</option>
                      <option value="illustrator">Illustrator</option>
                      <option value="premiere">Premiere Pro</option>
                      <option value="aftereffects">After Effects</option>
                      <option value="3d">3D Art</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      {formData.type === 'video' ? 'Video URL (YouTube/Vimeo embed or direct link)' : 'Image URL'}
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    {editingId ? 'Update' : 'Add Media'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Media List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mediaItems.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <p className="text-lg">No media items yet</p>
                  <p className="text-sm mt-2">Click "Add New Media" to get started</p>
                </div>
              ) : (
                mediaItems.map(item => (
                  <div key={item.id} className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="aspect-video bg-gray-900 relative">
                      {item.type === 'video' ? (
                        item.url.includes('youtube') || item.url.includes('vimeo') ? (
                          <iframe
                            src={item.url}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        ) : (
                          <video src={item.url} className="w-full h-full object-cover" controls />
                        )
                      ) : (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs uppercase">
                        {item.type}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h3>
                        <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3">{item.description}</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded transition-colors text-xs sm:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Admin
