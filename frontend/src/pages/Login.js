import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://secure-vault-api.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-box" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back 👋</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: '500', display: 'block', marginBottom: '5px' }}>Email Address</label>
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
        </div>

        <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '500', display: 'block', marginBottom: '5px' }}>Password</label>
            <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
        </div>

        <button type="submit" style={{ width: '100%' }}>Login to Vault</button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
        New here? <Link to="/register" style={{ color: '#4f46e5', fontWeight: 'bold' }}>Create an Account</Link>
      </p>
    </div>
  );
}
export default Login;