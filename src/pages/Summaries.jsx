import React, { useEffect, useState } from 'react';

const Summaries = () => {
  const [savedSummaries, setSavedSummaries] = useState([]);

  
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('kcnews_summaries')) || [];
      setSavedSummaries(data);
    } catch {
      setSavedSummaries([]);
    }
  }, []);

  
  const clearSummaries = () => {
    localStorage.removeItem('kcnews_summaries');
    setSavedSummaries([]);
  };

  
  const handleCopy = (summary) => {
    navigator.clipboard.writeText(summary);
    alert('✅ Summary copied to clipboard!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
     <h2
  style={{
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
    marginBottom: '1.5rem',
    textAlign: 'center',
    animation: 'float 3s ease-in-out infinite',
  }}
>
  📌 My Summaries
</h2>


      {savedSummaries.length > 0 && (
        <button
          onClick={clearSummaries}
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1.5rem',
          }}
        >
          🗑️ Clear All
        </button>
      )}

      {savedSummaries.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#666' }}>No saved summaries found.</p>
      ) : (
        <div
          className="summary-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {savedSummaries.map((item, index) => (
            <div
              key={index}
              className="summary-card"
              style={{
                padding: '1rem',
                backgroundColor: '#fffbe6',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item.title}</h3>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>🔗 URL:</strong>{' '}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#1565c0' }}
                >
                  {item.url}
                </a>
              </p>
              <p style={{ marginTop: '0.8rem', fontWeight: '500' }}>📝 Summary:</p>
              <p style={{ lineHeight: '1.5', color: '#333' }}>{item.summary}</p>

              <button
                onClick={() => handleCopy(item.summary)}
                style={{
                  marginTop: '0.8rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                📋 Copy Summary
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summaries;
