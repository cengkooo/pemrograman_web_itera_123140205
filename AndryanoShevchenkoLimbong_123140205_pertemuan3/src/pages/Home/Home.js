import React, { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

/**
 * Home Page - Halaman utama aplikasi
 */
const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">📚</span>
            Personal Book Tracker
          </h1>
          <p className="page-subtitle">
            Kelola koleksi buku Anda dengan mudah
          </p>
        </div>

        <button
          className="btn-add-book"
          onClick={handleToggleForm}
        >
          {showForm ? '✕ Tutup Form' : '+ Tambah Buku'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <BookForm
            onSubmit={handleFormSubmit}
            onCancel={handleToggleForm}
          />
        </div>
      )}

      <div className="filter-section">
        <BookFilter />
      </div>

      <div className="list-section">
        <BookList />
      </div>
    </div>
  );
};

export default Home;