import React from 'react';
import './NewsCard.css'; 

const NewsCard = ({ article, onSummarize, summary, isLoading }) => {
  const { title, urlToImage, description, url, author, publishedAt } = article;

  return (
    <div className="news-card">
      {urlToImage && (
        <img src={urlToImage} alt={title || 'Article thumbnail'} className="news-image" />
      )}
      <h3>{title}</h3>
      <p>
        <strong>By:</strong> {author || 'Unknown'} |{' '}
        {publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Date N/A'}
      </p>
      <p>{description}</p>

      <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
        📎 Read Full Article
      </a>

      <button onClick={onSummarize} disabled={isLoading}>
        {isLoading ? 'Summarizing...' : '🧠 Summarize'}
      </button>

      {summary && (
        <div className="summary-box">
          <strong>📄 Summary:</strong>
          <ul>
            {summary
              .split('\n')
              .filter(line => line.trim() !== '')
              .map((line, i) => (
                <li key={i}>{line.replace(/^[-•]\s*/, '').trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
