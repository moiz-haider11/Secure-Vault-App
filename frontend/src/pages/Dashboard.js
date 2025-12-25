import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchVaults = async () => {
      const token = localStorage.getItem('token');
      try {
        // Backend URL (Make sure ye sahi ho)
        const res = await axios.get('https://secure-vault-api.vercel.app/api/vault/mine', {
          headers: { Authorization: token }
        });
        setVaults(res.data);
      } catch (err) {
        console.error("Error fetching vaults", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVaults();
  }, []);

  // --- Copy Function ---
  const copyLink = (id) => {
    // Ye automatic detect karega ke Localhost hai ya Vercel
    const fullLink = `${window.location.origin}/vault/${id}`;
    navigator.clipboard.writeText(fullLink);
    alert("Link Copied to Clipboard! 📋");
  };

  return (
    <div className="animate-fade-in">
      
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <div>
            <h2 style={{margin: 0, fontSize: '2rem', background: '-webkit-linear-gradient(45deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              My Dashboard
            </h2>
            <p style={{color: '#64748b', marginTop: '5px'}}>Manage your secure links here</p>
        </div>
        
        {vaults.length > 0 && (
            <Link to="/create">
            <button>+ New Secret</button>
            </Link>
        )}
      </div>
      
      {/* Content */}
      {vaults.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👻</div>
          <h3 style={{fontSize: '1.5rem', color: '#1e293b', marginBottom: '10px'}}>It's quiet here...</h3>
          <p style={{color: '#64748b', maxWidth: '400px', margin: '0 auto 30px auto'}}>
            You haven't created any secure links yet.
          </p>
          <Link to="/create">
            <button style={{padding: '15px 40px', fontSize: '1.1rem'}}>Create First Secret 🚀</button>
          </Link>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px'}}>
          {vaults.map(vault => (
            <div key={vault._id} className="dashboard-card">
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <h3 style={{marginTop: 0, color: '#1e293b', fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px'}}>
                    {vault.title}
                </h3>
                <span style={{
                    padding: '5px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    background: vault.viewsLeft === 0 ? '#fee2e2' : '#dcfce7',
                    color: vault.viewsLeft === 0 ? '#ef4444' : '#16a34a'
                }}>
                    {vault.viewsLeft === 0 ? 'LOCKED' : 'ACTIVE'}
                </span>
              </div>
              
              <div style={{margin: '20px 0'}}>
                <p style={{color: '#64748b', margin: '5px 0', fontSize: '0.9rem'}}>
                    👀 <strong>Views:</strong> {vault.viewsLeft} / {vault.maxViews}
                </p>
                <p style={{color: '#64748b', margin: '5px 0', fontSize: '0.9rem'}}>
                    ⏳ <strong>Expires:</strong> {new Date(vault.expiresAt).toLocaleDateString()}
                </p>
              </div>
              
              {/* --- LINK SECTION (UPDATED) --- */}
              <div style={{
                  background: '#f8fafc', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
              }}>
                {/* Link ab clickable hai, click karne par new tab mein khulega */}
                <a 
                    href={`/vault/${vault._id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                        color: '#6366f1', 
                        fontSize: '0.85rem', 
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px',
                        cursor: 'pointer'
                    }}
                >
                    {/* Dikhne mein short, lekin kaam poora karega */}
                    {window.location.host}/vault/{vault._id}
                </a>

                {/* Copy Button */}
                <button 
                    onClick={() => copyLink(vault._id)}
                    style={{
                        padding: '5px 10px',
                        fontSize: '1rem',
                        marginLeft: '10px',
                        borderRadius: '6px',
                        background: '#e0e7ff',
                        color: '#4f46e5',
                        boxShadow: 'none',
                        border: 'none'
                    }}
                    title="Copy Full Link"
                >
                    📋
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Dashboard;