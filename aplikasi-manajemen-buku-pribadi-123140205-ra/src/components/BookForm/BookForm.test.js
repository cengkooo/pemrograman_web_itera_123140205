import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from './BookForm';
import { BookProvider } from '../../context/BookContext';

// Helper function untuk render dengan provider
const renderWithProvider = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  );
};

describe('BookForm Component', () => {
  
  test('renders form with all required fields', () => {
    renderWithProvider(<BookForm />);
    
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tambah buku/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    renderWithProvider(<BookForm />);
    
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/judul buku harus diisi/i)).toBeInTheDocument();
      expect(screen.getByText(/nama penulis harus diisi/i)).toBeInTheDocument();
    });
  });

  test('validates minimum character length', async () => {
    renderWithProvider(<BookForm />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    fireEvent.change(titleInput, { target: { value: 'Ab' } });
    fireEvent.change(authorInput, { target: { value: 'Cd' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/judul buku minimal 3 karakter/i)).toBeInTheDocument();
      expect(screen.getByText(/nama penulis minimal 3 karakter/i)).toBeInTheDocument();
    });
  });

  test('clears validation errors when user types', async () => {
    renderWithProvider(<BookForm />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    // Trigger validation error
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/judul buku harus diisi/i)).toBeInTheDocument();
    });

    // Type to clear error
    fireEvent.change(titleInput, { target: { value: 'New Book' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/judul buku harus diisi/i)).not.toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    renderWithProvider(<BookForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/penulis/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book Title' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.change(statusSelect, { target: { value: 'reading' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});