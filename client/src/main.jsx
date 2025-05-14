import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // StrictMode is a tool for highlighting potential problems in an application
  <StrictMode>
    {/* BrowserRouter is a component that enables routing in a React application */}
    {/* It uses the HTML5 history API to keep the UI in sync with the URL */}
    {/* It is used to wrap the entire application to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
