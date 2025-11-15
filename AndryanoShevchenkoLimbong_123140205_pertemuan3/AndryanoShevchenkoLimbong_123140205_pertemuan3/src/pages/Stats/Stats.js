import React from 'react';
import { useBookStats } from '../../hooks/useBookStats';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

/**
 * Stats Page - Halaman statistik buku
 */
const Stats = () => {
  const stats = useBookStats();
  const { books } = useBooks();

  // Get top authors
  const getTopAuthors = () => {
    const authorCounts = {};
    books.forEach(book => {
      authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
    });

    return Object.entries(authorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([author, count]) => ({ author, count }));
  };

  // Get recent books
  const getRecentBooks = () => {
    return [...books]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  const topAuthors = getTopAuthors();
  const recentBooks = getRecentBooks();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1 className="stats-title">
          <span className="stats-icon">📊</span>
          Statistik Buku
        </h1>
        <p className="stats-subtitle">
          Analisis koleksi buku Anda
        </p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Buku</div>
          </div>
        </div>

        <div className="stat-card stat-owned">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.owned}</div>
            <div className="stat-label">Dimiliki</div>
            <div className="stat-percentage">{stats.ownedPercentage}%</div>
          </div>
          <div className="stat-progress">
            <div 
              className="stat-progress-bar owned"
              style={{ width: `${stats.ownedPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card stat-reading">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <div className="stat-value">{stats.reading}</div>
            <div className="stat-label">Sedang Dibaca</div>
            <div className="stat-percentage">{stats.readingPercentage}%</div>
          </div>
          <div className="stat-progress">
            <div 
              className="stat-progress-bar reading"
              style={{ width: `${stats.readingPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card stat-wishlist">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <div className="stat-value">{stats.wishlist}</div>
            <div className="stat-label">Ingin Dibeli</div>
            <div className="stat-percentage">{stats.wishlistPercentage}%</div>
          </div>
          <div className="stat-progress">
            <div 
              className="stat-progress-bar wishlist"
              style={{ width: `${stats.wishlistPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="stats-details">
        {/* Top Authors */}
        <div className="stats-section">
          <h2 className="section-title">
            <span className="section-icon">✍️</span>
            Penulis Terfavorit
          </h2>
          {topAuthors.length > 0 ? (
            <div className="author-list">
              {topAuthors.map((author, index) => (
                <div key={index} className="author-item">
                  <div className="author-rank">{index + 1}</div>
                  <div className="author-info">
                    <div className="author-name">{author.author}</div>
                    <div className="author-count">{author.count} buku</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-message">
              Belum ada data penulis
            </div>
          )}
        </div>

        {/* Recent Books */}
        <div className="stats-section">
          <h2 className="section-title">
            <span className="section-icon">🕐</span>
            Buku Terbaru
          </h2>
          {recentBooks.length > 0 ? (
            <div className="recent-list">
              {recentBooks.map((book) => (
                <div key={book.id} className="recent-item">
                  <div className="recent-book">
                    <div className="recent-title">{book.title}</div>
                    <div className="recent-author">{book.author}</div>
                  </div>
                  <div className="recent-date">{formatDate(book.createdAt)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-message">
              Belum ada buku yang ditambahkan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;