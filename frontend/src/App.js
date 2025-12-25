import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateVault from './pages/CreateVault';
import ViewVault from './pages/ViewVault';

// 👇 Navbar ko alag Component banaya taake ye update ho sake
function Navbar() {
  const location = useLocation(); // Ye URL change hone par detect karega
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Har baar jab page badlega, ye check karega token hai ya nahi
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Logout ke baad home par bhej dega
  };

  return (
    <nav>
      {/* LOGO */}
      <Link 
        to={isAuthenticated ? "/dashboard" : "/"} 
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit' }}
      >
        <span style={{ fontSize: '1.5rem' }}>🔐</span>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>Vault App</span>
      </Link>

      {/* BUTTONS */}
      <div>
        {isAuthenticated ? (
          <button 
            onClick={logout} 
            style={{
              backgroundColor: '#ef4444', 
              padding: '8px 16px', 
              fontSize: '0.9rem', 
              width: 'auto', 
              marginTop: 0,
              cursor: 'pointer',
              border: 'none',
              color: 'white',
              borderRadius: '6px'
            }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
            <Link to="/register" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '600' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        
        {/* 👇 Ab Navbar yahan call hoga */}
        <Navbar />

        {/* Content Area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateVault />} />
            <Route path="/vault/:id" element={<ViewVault />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;