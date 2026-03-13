import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

const AppWithRouter = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (container.innerHTML === '') {
  // Client-side rendering (fallback)
  createRoot(container).render(AppWithRouter)
} else {
  // Hydration (SSR)
  hydrateRoot(container, AppWithRouter)
}
