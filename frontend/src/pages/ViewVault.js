import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ViewVault() {
  const params = useParams();
  // ID ko clean karo (space ya nayi line hatao)
  const id = params.id ? params.id.trim() : ""; 

  const [passcode, setPasscode] = useState('');
  const [secretData, setSecretData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Link check on load
  useEffect(() => {
    if (id.includes('...')) {
        setError("Invalid Link: Link is incomplete. Please copy correctly from Dashboard.");
    }
  }, [id]);

  const handleViewSecret = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend request
      // Make sure URL sahi ho (localhost ya render)
      const res = await axios.post(`https://secure-vault-api.vercel.app/api/vault/view/${id}`, { 
        passcode: passcode 
      });
      
      setSecretData(res.data);

    } catch (err) {
      console.error("Error details:", err);
      
      if (err.response) {
          // Backend ne jo specific error bheja hai wo dikhao
          if (err.response.status === 401) {
             setError("🔒 Wrong Passcode! Please try again.");
          } else if (err.response.status === 404) {
             setError("🗑️ Secret Not Found! It may have expired or reached view limit.");
          } else {
             setError(err.response.data.message || "Server Error");
          }
      } else {
          setError("Network Error: Can't connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (secretData) {
        navigator.clipboard.writeText(secretData.content);
        alert("Secret copied! 📋");
    }
  };

  return (
    <div className="container animate-fade-in" style={{maxWidth: '600px', marginTop: '60px'}}>
      
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <h2 style={{
            fontSize: '2rem', 
            marginBottom: '10px',
            background: '-webkit-linear-gradient(45deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        }}>
          Secure Vault Access 🔐
        </h2>
        <p style={{color: '#64748b'}}>You are trying to view a protected message.</p>
      </div>

      <div className="create-card" style={{textAlign: 'center', padding: '30px'}}>
        
        {/* State 1: Locked (Secret nahi mila abhi) */}
        {!secretData ? (
          <form onSubmit={handleViewSecret}>
            <div style={{fontSize: '4rem', marginBottom: '20px'}}>🛡️</div>
            
            {error && (
                <div style={{
                    backgroundColor: '#fee2e2', 
                    color: '#ef4444', 
                    padding: '10px', 
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #fecaca',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                }}>
                    {error}
                </div>
            )}

            <div style={{textAlign: 'left', marginBottom: '20px'}}>
              <label className="input-label">🔑 Passcode (Optional)</label>
              <input 
                type="text" 
                placeholder="Enter passcode here..." 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                    textAlign: 'center', 
                    fontSize: '1.2rem', 
                    letterSpacing: '1px',
                    padding: '12px'
                }}
              />
            </div>

            <button 
                type="submit" 
                disabled={loading || id.includes('...')}
                style={{width: '100%', padding: '15px', fontSize: '1.1rem'}}
            >
              {loading ? 'Unlocking...' : '🔓 Unlock Secret'}
            </button>
          </form>
        ) : (
          // State 2: Unlocked (Success)
          <div className="animate-fade-in">
            <div style={{fontSize: '4rem', marginBottom: '20px'}}>🎉</div>
            <h3 style={{color: '#10b981', margin: '0 0 10px 0'}}>Secret Revealed!</h3>
            
            <div style={{
                background: '#f1f5f9', 
                padding: '20px', 
                borderRadius: '10px', 
                border: '2px dashed #cbd5e1',
                margin: '20px 0',
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                color: '#334155'
            }}>
                {secretData.content}
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
                <button type="button" onClick={copyToClipboard} style={{flex: 1, background: '#3b82f6'}}>
                    📋 Copy Text
                </button>
                <Link to="/dashboard" style={{flex: 1}}>
                    <button type="button" style={{width: '100%', background: '#64748b'}}>
                        🏠 Dashboard
                    </button>
                </Link>
            </div>
            
            <p style={{marginTop: '15px', fontSize: '0.85rem', color: '#ef4444'}}>
                ⚠️ This message will vanish after {secretData.viewsLeft} more views.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ViewVault;