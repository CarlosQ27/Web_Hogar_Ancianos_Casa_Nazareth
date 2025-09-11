import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import './App.css'

export default function App() {
  return (
    <Router>
      <div style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}