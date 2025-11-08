import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BookProvider, useBooks } from './BookContext';

// Wrapper component untuk testing
const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>;

describe('BookContext', () => {
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('provides initial empty books array', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    expect(result.current.books).toEqual([]);
  });

  test('adds a new book successfully', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    act(() => {
      result.current.addBook({
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned'
      });
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Test Book');
    expect(result.current.books[0].author).toBe('Test Author');
    expect(result.current.books[0].status).toBe('owned');
  });

  test('updates an existing book', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    let bookId;
    
    // Add a book
    act(() => {
      const newBook = result.current.addBook({
        title: 'Original Title',
        author: 'Original Author',
        status: 'owned'
      });
      bookId = newBook.id;
    });

    // Update the book
    act(() => {
      result.current.updateBook(bookId, {
        title: 'Updated Title',
        status: 'reading'
      });
    });

    const updatedBook = result.current.books.find(b => b.id === bookId);
    expect(updatedBook.title).toBe('Updated Title');
    expect(updatedBook.author).toBe('Original Author'); // Should remain unchanged
    expect(updatedBook.status).toBe('reading');
  });

  test('deletes a book successfully', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    let bookId;
    
    // Add a book
    act(() => {
      const newBook = result.current.addBook({
        title: 'Book to Delete',
        author: 'Author',
        status: 'owned'
      });
      bookId = newBook.id;
    });

    expect(result.current.books).toHaveLength(1);

    // Delete the book
    act(() => {
      result.current.deleteBook(bookId);
    });

    expect(result.current.books).toHaveLength(0);
  });

  test('filters books by status correctly', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    // Add multiple books
    act(() => {
      result.current.addBook({
        title: 'Owned Book',
        author: 'Author 1',
        status: 'owned'
      });
      result.current.addBook({
        title: 'Reading Book',
        author: 'Author 2',
        status: 'reading'
      });
      result.current.addBook({
        title: 'Wishlist Book',
        author: 'Author 3',
        status: 'wishlist'
      });
    });

    // Filter by 'reading'
    act(() => {
      result.current.setFilter('reading');
    });

    const filtered = result.current.getFilteredBooks();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Reading Book');
  });

  test('searches books by title and author', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    // Add test books
    act(() => {
      result.current.addBook({
        title: 'JavaScript Guide',
        author: 'John Doe',
        status: 'owned'
      });
      result.current.addBook({
        title: 'Python Programming',
        author: 'Jane Smith',
        status: 'reading'
      });
    });

    // Search by title
    act(() => {
      result.current.setSearchQuery('JavaScript');
    });

    let filtered = result.current.getFilteredBooks();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('JavaScript Guide');

    // Search by author
    act(() => {
      result.current.setSearchQuery('Jane');
    });

    filtered = result.current.getFilteredBooks();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].author).toBe('Jane Smith');
  });

  test('calculates statistics correctly', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    
    // Add books with different statuses
    act(() => {
      result.current.addBook({ title: 'Book 1', author: 'Author 1', status: 'owned' });
      result.current.addBook({ title: 'Book 2', author: 'Author 2', status: 'owned' });
      result.current.addBook({ title: 'Book 3', author: 'Author 3', status: 'reading' });
      result.current.addBook({ title: 'Book 4', author: 'Author 4', status: 'wishlist' });
    });

    const stats = result.current.getStats();
    
    expect(stats.total).toBe(4);
    expect(stats.owned).toBe(2);
    expect(stats.reading).toBe(1);
    expect(stats.wishlist).toBe(1);
  });
});