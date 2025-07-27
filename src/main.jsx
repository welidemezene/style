import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeMobileOptimizations } from './utils/mobileOptimization.js'

// Initialize mobile optimizations
if (typeof window !== 'undefined') {
  // Initialize on load
  initializeMobileOptimizations();

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileOptimizations);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
