// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const API_KEY='37a1f4f4f6b84a0eae50a6b37b1b6362'; // Your NewsAPI key

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const targetURL=`https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${API_KEY}`;
        const proxyURL=`https://api.allorigins.win/get?url=${encodeURIComponent(targetURL)}`;

        const res = await axios.get(proxyURL);
        const rawHtml = res.data.contents;

        const jsonStart = rawHtml.indexOf('{');
        const json = JSON.parse(rawHtml.slice(jsonStart));

        setArticles(json.articles || []);
        console.log('Fetched articles:', json.articles);
      } catch (err) {
        console.error('❌ Error fetching headlines (Netlify-safe):', err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Top Headlines</h1>

      {loading ? (
        <p>Loading news...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div
          className="news-grid"
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}
        >
          {articles.map((article, index) => (
            <div
              className="news-card"
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '10px',
                background: '#fefefe',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="thumbnail"
                  style={{
                    width: '100%',
                    borderRadius: '6px',
                    marginBottom: '0.5rem',
                  }}
                />
              )}
              <h3 style={{ fontSize: '1.1rem' }}>{article.title}</h3>
              <p>{article.description || 'No description available.'}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1565c0', textDecoration: 'underline' }}
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
