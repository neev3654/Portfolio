import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ActiveSectionProvider } from './hooks/useActiveSection.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActiveSectionProvider>
      <App />
    </ActiveSectionProvider>
  </StrictMode>,
)
