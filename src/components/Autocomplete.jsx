/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import countryData from '../../resources/countryData.json';

const Autocomplete = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        console.log('Escape');
        setShowSuggestions(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearch = () => {
    if (inputText) {
      const filteredSuggestions = countryData.filter((country) =>
        country.name.toLowerCase().startsWith(inputText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete">
      <div className="search-container">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Type to search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
