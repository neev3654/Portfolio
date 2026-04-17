import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ActiveSectionProvider } from './hooks/useActiveSection.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ActiveSectionProvider>
        <App />
      </ActiveSectionProvider>
    </BrowserRouter>
  </StrictMode>,
)
