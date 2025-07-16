import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AdvancedSearch = ({
  onSearch,
  filters = {},
  suggestions = [],
  placeholder = "Search...",
  className = "",
  debounceMs = 300,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [localFilters, setLocalFilters] = useState(filters);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch();
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, localFilters]);

  const handleSearch = () => {
    const searchParams = {
      ...localFilters,
      search: searchQuery.trim(),
    };

    // Add to search history if query is not empty
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      const newHistory = [searchQuery.trim(), ...searchHistory.slice(0, 9)]; // Keep last 10 searches
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }

    onSearch(searchParams);
    setShowSuggestions(false);
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    setActiveSuggestion(-1);
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    const allSuggestions = [...suggestions, ...searchHistory];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0 && allSuggestions[activeSuggestion]) {
          handleSuggestionClick(allSuggestions[activeSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLocalFilters({});
    onSearch({ search: '' });
  };

  const filterOptions = [
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: '', label: 'All Departments' },
        { value: 'cse', label: 'Computer Science & Engineering' },
        { value: 'ece', label: 'Electronics & Communication' },
        { value: 'me', label: 'Mechanical Engineering' },
        { value: 'ce', label: 'Civil Engineering' },
        { value: 'ee', label: 'Electrical Engineering' },
        { value: 'it', label: 'Information Technology' },
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
      ]
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'daterange'
    }
  ];

  const allSuggestions = [...suggestions, ...searchHistory];
  const filteredSuggestions = allSuggestions.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            placeholder={placeholder}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-lg transition-colors ${
                isExpanded ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Icon name="Filter" size={16} />
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.length > 0 && (
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Suggestions
                </div>
              )}
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                    index === activeSuggestion ? 'bg-gray-50' : ''
                  }`}
                >
                  <Icon name="Search" size={14} className="text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
              
              {searchHistory.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Recent Searches
                  </div>
                  {searchHistory
                    .filter(history => history.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 5)
                    .map((history, index) => {
                      const suggestionIndex = suggestions.length + index;
                      return (
                        <button
                          key={`history-${index}`}
                          onClick={() => handleSuggestionClick(history)}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                            suggestionIndex === activeSuggestion ? 'bg-gray-50' : ''
                          }`}
                        >
                          <Icon name="Clock" size={14} className="text-gray-400" />
                          <span>{history}</span>
                        </button>
                      );
                    })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterOptions.map((option) => (
                <div key={option.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {option.label}
                  </label>
                  {option.type === 'select' ? (
                    <Select
                      value={localFilters[option.key] || ''}
                      onChange={(value) => handleFilterChange(option.key, value)}
                      options={option.options}
                      placeholder={`Select ${option.label}`}
                    />
                  ) : option.type === 'daterange' ? (
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={localFilters[`${option.key}From`] || ''}
                        onChange={(e) => handleFilterChange(`${option.key}From`, e.target.value)}
                        placeholder="From"
                      />
                      <Input
                        type="date"
                        value={localFilters[`${option.key}To`] || ''}
                        onChange={(e) => handleFilterChange(`${option.key}To`, e.target.value)}
                        placeholder="To"
                      />
                    </div>
                  ) : (
                    <Input
                      value={localFilters[option.key] || ''}
                      onChange={(e) => handleFilterChange(option.key, e.target.value)}
                      placeholder={option.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {Object.values(localFilters).filter(v => v).length} filter(s) applied
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLocalFilters({});
                    setSearchQuery('');
                  }}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  onClick={handleSearch}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;