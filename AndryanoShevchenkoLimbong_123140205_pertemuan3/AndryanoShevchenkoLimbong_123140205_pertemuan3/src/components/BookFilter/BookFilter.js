import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

/**
 * Component untuk filter dan search buku
 */
const BookFilter = () => {
  const { filter, setFilter, searchQuery, setSearchQuery, books } = useBooks();

  // Hitung jumlah buku per status
  const counts = {
    all: books.length,
    owned: books.filter(b => b.status === 'owned').length,
    reading: books.filter(b => b.status === 'reading').length,
    wishlist: books.filter(b => b.status === 'wishlist').length
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="book-filter">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari judul atau penulis..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={clearSearch}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          <span className="filter-label">Semua</span>
          <span className="filter-count">{counts.all}</span>
        </button>

        <button
          className={`filter-btn ${filter === 'owned' ? 'active' : ''}`}
          onClick={() => handleFilterChange('owned')}
        >
          <span className="filter-label">📚 Dimiliki</span>
          <span className="filter-count">{counts.owned}</span>
        </button>

        <button
          className={`filter-btn ${filter === 'reading' ? 'active' : ''}`}
          onClick={() => handleFilterChange('reading')}
        >
          <span className="filter-label">📖 Sedang Dibaca</span>
          <span className="filter-count">{counts.reading}</span>
        </button>

        <button
          className={`filter-btn ${filter === 'wishlist' ? 'active' : ''}`}
          onClick={() => handleFilterChange('wishlist')}
        >
          <span className="filter-label">🛒 Ingin Dibeli</span>
          <span className="filter-count">{counts.wishlist}</span>
        </button>
      </div>
    </div>
  );
};

export default BookFilter;