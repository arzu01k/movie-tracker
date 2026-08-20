import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-black mb-4 py-4">
        <div className="container-fluid px-4">
          <span className="navbar-brand mb-0 fs-2 fw-bold">
            🎬 <span className="text-danger">Movie</span> Tracker
          </span>
        </div>
      </nav>

      <Home />
    </>
  )
}

export default App
