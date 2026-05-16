import { Menu, X, Tv, Home, Settings, Clock, Star, Search } from 'lucide-react'

const channels = [
  { id: 1, name: 'Live TV', icon: Tv, url: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 2, name: 'Movies', icon: Star, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, name: 'Sports', icon: Tv, url: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 4, name: 'News', icon: Tv, url: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 5, name: 'Music', icon: Star, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 6, name: 'Kids', icon: Tv, url: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 7, name: 'Documentary', icon: Tv, url: 'https://www.youtube.com/embed/jfKfPfyJRdk' },
  { id: 8, name: 'Settings', icon: Settings, url: null },
]

const Sidebar = ({ activeChannel, setActiveChannel, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside 
      className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <Tv className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">IPTV Portal</span>
          </div>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="p-2 space-y-1">
        <div
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
            !activeChannel ? 'bg-primary text-white' : 'hover:bg-slate-700'
          }`}
          onClick={() => setActiveChannel(null)}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && <span>Dashboard</span>}
        </div>

        <div className="pt-4 pb-2">
          {isSidebarOpen && (
            <span className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Channels
            </span>
          )}
        </div>

        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              activeChannel?.id === channel.id ? 'bg-primary text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => channel.url && setActiveChannel(channel)}
          >
            <channel.icon className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>{channel.name}</span>}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-slate-700 bg-slate-800">
        <div className="flex items-center gap-3 p-3 text-slate-400">
          <Clock className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && (
            <span className="text-sm">{new Date().toLocaleTimeString()}</span>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
