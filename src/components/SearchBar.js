'use client';

import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: 'Tous'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="bg-theme-card rounded-2xl p-6 shadow-lg border border-theme">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Localisation
            </label>
            <input
              type="text"
              placeholder="Paris, Lyon, Marseille..."
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-theme bg-theme-primary text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Prix min
            </label>
            <input
              type="number"
              placeholder="500€"
              value={searchData.minPrice}
              onChange={(e) => handleInputChange('minPrice', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-theme bg-theme-primary text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Prix max
            </label>
            <input
              type="number"
              placeholder="1500€"
              value={searchData.maxPrice}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-theme bg-theme-primary text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Type
            </label>
            <select
              value={searchData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-theme bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              <option value="Tous">Tous les types</option>
              <option value="Studio">Studio</option>
              <option value="Appartement">Appartement</option>
              <option value="Chambre">Chambre</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Rechercher</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

