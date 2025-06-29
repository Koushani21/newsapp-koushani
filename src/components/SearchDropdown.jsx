import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchDropdown.css'; 


const categories = [
  { label: 'Health', value: 'health' },
  { label: 'Sports', value: 'sports' },
  { label: 'Tech', value: 'tech' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'World', value: 'world' },
  { label: 'Business', value: 'business' },
];

const SearchDropdown = () => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (selected) {
      navigate(`/category/${selected}`);
    }
  };

  return (
    <div className="search-dropdown">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="custom-dropdown"
        aria-label="Select News Category"
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="custom-button"
        disabled={!selected}
      >
        Go
      </button>
    </div>
  );
};

export default SearchDropdown;
