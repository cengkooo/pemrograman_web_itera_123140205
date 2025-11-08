import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const BookContext = createContext();

// Custom hook untuk menggunakan BookContext
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};

// BookProvider Component
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load books dari localStorage saat pertama kali
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem('books');
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error('Error loading books from localStorage:', error);
    }
  }, []);

  // Simpan books ke localStorage setiap ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
      console.error('Error saving books to localStorage:', error);
    }
  }, [books]);

  // Tambah buku baru
  const addBook = (book) => {
    const newBook = {
      id: Date.now().toString(),
      ...book,
      createdAt: new Date().toISOString()
    };
    setBooks(prevBooks => [...prevBooks, newBook]);
    return newBook;
  };

  // Update buku
  const updateBook = (id, updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  // Hapus buku
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Get filtered books
  const getFilteredBooks = () => {
    let filtered = books;

    // Filter berdasarkan status
    if (filter !== 'all') {
      filtered = filtered.filter(book => book.status === filter);
    }

    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Get book by id
  const getBookById = (id) => {
    return books.find(book => book.id === id);
  };

  // Get statistics
  const getStats = () => {
    return {
      total: books.length,
      owned: books.filter(b => b.status === 'owned').length,
      reading: books.filter(b => b.status === 'reading').length,
      wishlist: books.filter(b => b.status === 'wishlist').length
    };
  };

  const value = {
    books,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addBook,
    updateBook,
    deleteBook,
    getFilteredBooks,
    getBookById,
    getStats
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};