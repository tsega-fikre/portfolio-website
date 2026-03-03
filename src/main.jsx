import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Lazy load DevTools Protection (non-critical)
const initDevToolsProtection = async () => {
  const { default: DevToolsProtection } = await import('./utils/devtools-protection.js')
  const protection = new DevToolsProtection()
  protection.start()
}

// Initialize after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Defer non-critical initialization
    requestIdleCallback(() => {
      initDevToolsProtection()
    }, { timeout: 2000 })
  })
}

// Optimize event listeners
const setupEventListeners = () => {
  document.body.style.userSelect = 'none'
  document.body.style.webkitUserSelect = 'none'
  
  const preventDrag = (e) => e.preventDefault()
  const preventSelect = (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
    }
  }
  
  document.addEventListener('dragstart', preventDrag, { passive: false })
  document.addEventListener('drop', preventDrag, { passive: false })
  document.addEventListener('selectstart', preventSelect, { passive: false })
}

// Setup after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEventListeners)
} else {
  setupEventListeners()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
