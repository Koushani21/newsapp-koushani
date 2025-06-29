
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const categories = ['Health', 'Sports', 'Tech', 'Entertainment', 'World', 'Business'];

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    setShowDropdown(false);
    setSearch('');
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="https://img.freepik.com/premium-photo/3d-icon-news-globe-3d-illustration-3d-element-3d-rendering-graphic-elements-design-element_808921-1281.jpg?semt=ais_hybrid&w=740" alt="Logo" />
        <span className="logo-text">KC NEWS</span>
      </div>

      <div className="nav-links">
        <button onClick={() => setShowDropdown(!showDropdown)}>Search Categories</button>
        <Link to="/">Home</Link>
        <Link to="/summaries">My Summaries</Link>
      </div>

      {showDropdown && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div
                key={cat}
                className="dropdown-item"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No results found</div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
