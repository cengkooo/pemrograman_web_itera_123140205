import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

/**
 * Main Application Component
 */
function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          {/* Navigation */}
          <nav className="navbar">
            <div className="nav-container">
              <div className="nav-logo">
                <span className="logo-icon">📚</span>
                <span className="logo-text">BookTracker</span>
              </div>
              
              <ul className="nav-menu">
                <li className="nav-item">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">🏠</span>
                    <span className="nav-text">Beranda</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/stats" 
                    className={({ isActive }) => 
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">📊</span>
                    <span className="nav-text">Statistik</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <p className="footer-text">
                © 2024 Personal Book Tracker | Built with React
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;