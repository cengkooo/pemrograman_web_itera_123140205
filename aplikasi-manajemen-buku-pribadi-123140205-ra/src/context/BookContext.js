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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load books dari localStorage saat pertama kali - HANYA SEKALI
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem('books');
      console.log('📖 Loading from localStorage:', storedBooks);
      
      if (storedBooks && storedBooks !== 'undefined' && storedBooks !== 'null') {
        const parsedBooks = JSON.parse(storedBooks);
        if (Array.isArray(parsedBooks) && parsedBooks.length > 0) {
          setBooks(parsedBooks);
          console.log('✅ Books loaded successfully:', parsedBooks);
        }
      }
    } catch (error) {
      console.error('❌ Error loading books from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []); // HANYA RUN SEKALI saat mount

  // Simpan books ke localStorage setiap ada perubahan - TAPI SKIP SAAT FIRST LOAD
  useEffect(() => {
    if (!isLoaded) {
      return; // Skip save saat pertama kali load
    }

    try {
      console.log('💾 Saving to localStorage:', books);
      localStorage.setItem('books', JSON.stringify(books));
      console.log('✅ Books saved successfully');
    } catch (error) {
      console.error('❌ Error saving books to localStorage:', error);
    }
  }, [books, isLoaded]); // Run setiap books berubah DAN setelah loaded

  // Tambah buku baru
  const addBook = (book) => {
    const newBook = {
      id: Date.now().toString(),
      ...book,
      createdAt: new Date().toISOString()
    };
    
    setBooks(prevBooks => {
      const updatedBooks = [...prevBooks, newBook];
      console.log('➕ Adding book:', newBook);
      return updatedBooks;
    });
    
    return newBook;
  };

  // Update buku
  const updateBook = (id, updatedBook) => {
    setBooks(prevBooks => {
      const updated = prevBooks.map(book =>
        book.id === id ? { ...book, ...updatedBook } : book
      );
      console.log('✏️ Updating book:', id);
      return updated;
    });
  };

  // Hapus buku
  const deleteBook = (id) => {
    setBooks(prevBooks => {
      const filtered = prevBooks.filter(book => book.id !== id);
      console.log('🗑️ Deleting book:', id);
      return filtered;
    });
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