import { Search, Bell, User, Maximize2, ChevronDown, Minimize2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const MainContent = ({ activeChannel, isSidebarOpen }) => {
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState('HD')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef(null)
  const containerRef = useRef(null)

  const qualities = ['Auto', '4K', '1080p', '720p', '480p', '360p']

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen()
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen()
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen()
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])
  return (
    <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search channels..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 bg-slate-900 p-6">
        {!activeChannel ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="bg-slate-800 rounded-2xl p-12 max-w-2xl">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Maximize2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome to IPTV Portal</h2>
              <p className="text-slate-400 mb-6">
                Select a channel from the sidebar to start streaming. Enjoy your favorite content in a modern, professional interface.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-slate-400">Channels</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">HD</div>
                  <div className="text-sm text-slate-400">Quality</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-slate-400">Streaming</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{activeChannel.name}</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    {selectedQuality}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showQualityMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-[120px]">
                      {qualities.map((quality) => (
                        <button
                          key={quality}
                          onClick={() => {
                            setSelectedQuality(quality)
                            setShowQualityMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleFullscreen}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </button>
              </div>
            </div>
            <div ref={containerRef} className="flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl relative">
              <iframe
                ref={iframeRef}
                src={activeChannel.url}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              {isFullscreen && (
                <button
                  onClick={handleFullscreen}
                  className="absolute top-4 right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <Minimize2 className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default MainContent
