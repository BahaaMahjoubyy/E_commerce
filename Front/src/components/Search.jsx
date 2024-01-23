// Search.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Assuming your backend endpoint for searching products is "/products/search"
      const response = await axios.get(`http://localhost:8080/products/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Products</h2>
      <input type="text" value={searchQuery} onChange={handleInputChange} className="search-input" />
      <button type="button" onClick={handleSearch} className="search-button">
        Search
      </button>

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul className="search-results">
            {searchResults.map((product) => (
              <li key={product.id} className="search-item">
                <p className="result-info">Name: {product.name}</p>
                <p className="result-info">Price: ${product.price}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
