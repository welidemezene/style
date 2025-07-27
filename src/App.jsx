import Hero from './components/Hero';
import FullPageJapanese from './components/check';

function App() {
  return (
    <div className="app-container">
      <div className="component-layer hero-wrapper">
        <Hero />
      </div>
      <div className="component-layer japanese-wrapper">
        <FullPageJapanese />
      </div>
    </div>
  )
}

export default App
