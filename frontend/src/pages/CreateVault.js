import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateVault() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    maxViews: 5,
    expiresIn: 60, // Minutes
    passcode: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { title, content, maxViews, expiresIn, passcode } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. LocalStorage se Token nikalo (Jo login karte waqt save hua tha)
      const token = localStorage.getItem('token');

      // Agar token nahi hai, to user ko Login page pe bhej do
      if (!token) {
        alert("Please Login First!");
        navigate('/login');
        return;
      }

      // 2. Configuration mein Token set karo
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // <--- YE HAI WO MAIN CHEEZ JO MISSING THI
        }
      };

      // 3. Data prepare karo (Backend ke variable names ke hisaab se)
      const body = {
        title,
        content,
        maxViews,
        expiresAfterMinutes: expiresIn, // Backend "expiresAfterMinutes" mangta hai
        passcode
      };

      // 4. Backend ko bhejo
      await axios.post('https://secure-vault-api.vercel.app/api/vault/create', body, config);

      // Success! Dashboard pe le jao
      alert("Magic Created! ✨");
      navigate('/dashboard');

    } catch (err) {
      console.error("Create Error:", err);
      // Error message dikhao
      const errorMsg = err.response && err.response.data.message 
        ? err.response.data.message 
        : "Error creating vault. Check console for details.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{maxWidth: '600px', marginTop: '50px'}}>
      <h2 style={{marginBottom: '20px', color: '#6366f1'}}>Create New Secret 🪄</h2>
      <p style={{marginBottom: '30px', color: '#64748b'}}>Set rules for your secret message.</p>
      
      <form onSubmit={handleSubmit} className="create-card">
        
        {/* Title */}
        <div className="form-group">
          <label className="input-label">🏷️ Title (Reference for you)</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="e.g. WiFi Password for Guest"
            required
            className="input-field"
          />
        </div>

        {/* Secret Content */}
        <div className="form-group">
          <label className="input-label">📝 Secret Content</label>
          <textarea
            name="content"
            value={content}
            onChange={onChange}
            placeholder="Write your sensitive info here..."
            required
            rows="4"
            className="input-field"
            style={{resize: 'none'}}
          ></textarea>
        </div>

        <div style={{display: 'flex', gap: '20px'}}>
          {/* Max Views */}
          <div className="form-group" style={{flex: 1}}>
            <label className="input-label">👀 Max Views</label>
            <input
              type="number"
              name="maxViews"
              value={maxViews}
              onChange={onChange}
              min="1"
              required
              className="input-field"
            />
          </div>

          {/* Expiry */}
          <div className="form-group" style={{flex: 1}}>
            <label className="input-label">⏳ Expires In (Minutes)</label>
            <input
              type="number"
              name="expiresIn"
              value={expiresIn}
              onChange={onChange}
              min="1"
              required
              className="input-field"
            />
          </div>
        </div>

        {/* Passcode */}
        <div className="form-group">
          <label className="input-label">🔑 Optional Passcode (Extra Security)</label>
          <input
            type="text"
            name="passcode"
            value={passcode}
            onChange={onChange}
            placeholder="Leave blank for no password"
            className="input-field"
          />
        </div>

        <button type="submit" disabled={loading} style={{width: '100%', padding: '15px', fontSize: '1.1rem'}}>
          {loading ? 'Creating Magic... ✨' : 'Create Secure Vault 🚀'}
        </button>

      </form>
    </div>
  );
}

export default CreateVault;