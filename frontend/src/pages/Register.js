import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://secure-vault-api.vercel.app/api/auth/register', { username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-box" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account 🚀</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500', display: 'block', marginBottom: '5px' }}>Username</label>
            <input type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500', display: 'block', marginBottom: '5px' }}>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '500', display: 'block', marginBottom: '5px' }}>Password</label>
            <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" style={{ width: '100%' }}>Sign Up</button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/" style={{ color: '#4f46e5', fontWeight: 'bold' }}>Login</Link>
      </p>
    </div>
  );
}
export default Register;