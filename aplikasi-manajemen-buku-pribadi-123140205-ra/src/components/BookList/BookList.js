import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

/**
 * Component untuk menampilkan daftar buku
 */
const BookList = () => {
  const { getFilteredBooks, deleteBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredBooks = getFilteredBooks();

  // Handle edit book
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  // Handle delete book
  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteBook(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Handle setelah form submit
  const handleFormSubmit = () => {
    setEditingBook(null);
  };

  const handleFormCancel = () => {
    setEditingBook(null);
  };

  // Get status label dan badge class
  const getStatusInfo = (status) => {
    const statusMap = {
      owned: { label: 'Dimiliki', class: 'status-owned' },
      reading: { label: 'Sedang Dibaca', class: 'status-reading' },
      wishlist: { label: 'Ingin Dibeli', class: 'status-wishlist' }
    };
    return statusMap[status] || statusMap.owned;
  };

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Jika sedang edit, tampilkan form
  if (editingBook) {
    return (
      <div className="book-list-container">
        <BookForm
          editBook={editingBook}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="book-list-container">
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Tidak ada buku ditemukan</h3>
          <p>Tambahkan buku pertama Anda atau ubah filter pencarian</p>
        </div>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => {
            const statusInfo = getStatusInfo(book.status);
            
            return (
              <div key={book.id} className="book-card">
                <div className="book-card-header">
                  <h3 className="book-title">{book.title}</h3>
                  <span className={`status-badge ${statusInfo.class}`}>
                    {statusInfo.label}
                  </span>
                </div>

                <div className="book-card-body">
                  <p className="book-author">
                    <span className="author-icon">✍️</span>
                    {book.author}
                  </p>
                  
                  {book.createdAt && (
                    <p className="book-date">
                      <span className="date-icon">📅</span>
                      Ditambahkan: {formatDate(book.createdAt)}
                    </p>
                  )}
                </div>

                <div className="book-card-actions">
                  <button
                    onClick={() => handleEdit(book)}
                    className="btn-action btn-edit"
                    aria-label="Edit buku"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="btn-action btn-delete"
                    aria-label="Hapus buku"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Konfirmasi Hapus</h3>
            <p className="modal-text">
              Apakah Anda yakin ingin menghapus buku ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-actions">
              <button
                onClick={confirmDelete}
                className="btn btn-danger"
              >
                Ya, Hapus
              </button>
              <button
                onClick={cancelDelete}
                className="btn btn-secondary"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;