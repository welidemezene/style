import Hero from './components/Hero';
import FullPageJapanese from './components/check';
import { useEffect } from 'react';
import { initializeMobileOptimizations } from './utils/mobileOptimization.js';

function App() {
  useEffect(() => {
    // Initialize mobile optimizations when App mounts
    initializeMobileOptimizations();
  }, []);

  return (
    <div className="app-container mobile-scroll-container">
      <div className="component-layer hero-wrapper mobile-safe-area-container">
        <Hero />
      </div>
      <div className="component-layer japanese-wrapper mobile-safe-area-container">
        <FullPageJapanese />
      </div>
    </div>
  )
}

export default App
