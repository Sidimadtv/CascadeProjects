import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [activeChannel, setActiveChannel] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar 
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MainContent 
        activeChannel={activeChannel}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  )
}

export default App
