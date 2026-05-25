import React, { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

// Read the server-side pre-fetched initial state if present
const initialServerState = typeof window !== 'undefined' ? window.__INITIAL_STATE__ : null

const AppWithRouter = (
  <StrictMode>
    <BrowserRouter>
      <App initialServerState={initialServerState} />
    </BrowserRouter>
  </StrictMode>
)

const hasPrerenderedContent = container && container.hasChildNodes() && container.innerHTML.trim() !== "";

if (hasPrerenderedContent) {
  // Hydration (SSR / Prerender)
  hydrateRoot(container, AppWithRouter)
} else {
  // Client-side rendering (fallback)
  createRoot(container).render(AppWithRouter)
}
