import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

/**
 * Component untuk form tambah/edit buku
 * @param {object} props - Props component
 * @param {object} props.editBook - Buku yang akan diedit (optional)
 * @param {function} props.onSubmit - Callback setelah submit
 * @param {function} props.onCancel - Callback untuk cancel
 */
const BookForm = ({ editBook, onSubmit, onCancel }) => {
  const { addBook, updateBook } = useBooks();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'owned'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set form data jika mode edit
  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || '',
        author: editBook.author || '',
        status: editBook.status || 'owned'
      });
    }
  }, [editBook]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error untuk field yang diubah
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku harus diisi';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Judul buku minimal 3 karakter';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis harus diisi';
    } else if (formData.author.trim().length < 3) {
      newErrors.author = 'Nama penulis minimal 3 karakter';
    }

    if (!formData.status) {
      newErrors.status = 'Status harus dipilih';
    }

    return newErrors;
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        status: formData.status
      };

      if (editBook) {
        // Update buku
        updateBook(editBook.id, bookData);
      } else {
        // Tambah buku baru
        addBook(bookData);
      }

      // Reset form
      setFormData({
        title: '',
        author: '',
        status: 'owned'
      });
      setErrors({});

      // Callback
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2 className="form-title">
        {editBook ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h2>

      {errors.submit && (
        <div className="error-message error-submit">{errors.submit}</div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Judul Buku <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="Masukkan judul buku"
          disabled={isSubmitting}
        />
        {errors.title && (
          <span className="error-message">{errors.title}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="author" className="form-label">
          Penulis <span className="required">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={`form-input ${errors.author ? 'input-error' : ''}`}
          placeholder="Masukkan nama penulis"
          disabled={isSubmitting}
        />
        {errors.author && (
          <span className="error-message">{errors.author}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="status" className="form-label">
          Status <span className="required">*</span>
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`form-select ${errors.status ? 'input-error' : ''}`}
          disabled={isSubmitting}
        >
          <option value="owned">Dimiliki</option>
          <option value="reading">Sedang Dibaca</option>
          <option value="wishlist">Ingin Dibeli</option>
        </select>
        {errors.status && (
          <span className="error-message">{errors.status}</span>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Menyimpan...' : editBook ? 'Update Buku' : 'Tambah Buku'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;