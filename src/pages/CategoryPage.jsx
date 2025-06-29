

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { summarizeArticle } from '../utils/summarize';

const API_KEY = '37a1f4f4f6b84a0eae50a6b37b1b6362';

const categoryMap = {
  tech: 'technology',
  health: 'health',
  sports: 'sports',
  entertainment: 'entertainment',
  world: 'general',
  business: 'business',
};

const CategoryPage = () => {
  const { name } = useParams();
  const [articles, setArticles] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const category = categoryMap[name.toLowerCase()] || 'general';
        const targetURL = `https://newsapi.org/v2/top-headlines?language=en&category=${category}&pageSize=20&apiKey=${API_KEY}`;
        const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(targetURL)}`;

        const res = await axios.get(proxyURL);
        const rawHtml = res.data.contents;
        const jsonStart = rawHtml.indexOf('{');
        const json = JSON.parse(rawHtml.slice(jsonStart));

        setArticles(json.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      }
    };

    fetchCategoryNews();
  }, [name]);

  const handleSummarize = async (idx, article) => {
    setLoadingIndex(idx);
    const summary = await summarizeArticle(article.title, article.description, article.url);
    setSummaries(prev => ({ ...prev, [idx]: summary }));
    setLoadingIndex(null);

    const previous = JSON.parse(localStorage.getItem('kcnews_summaries')) || [];
    const newEntry = {
      title: article.title,
      url: article.url,
      summary,
    };
    localStorage.setItem('kcnews_summaries', JSON.stringify([newEntry, ...previous]));
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {name.charAt(0).toUpperCase() + name.slice(1)} News
      </h2>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div
          className="news-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {articles.map((article, idx) => (
            <NewsCard
              key={idx}
              article={article}
              onSummarize={() => handleSummarize(idx, article)}
              isLoading={loadingIndex === idx}
              summary={summaries[idx]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
