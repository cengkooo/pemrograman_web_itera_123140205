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

    // FIXED: Cek keduanya dalam satu waitFor, tapi query secara spesifik
    const titleError = await screen.findByText(/judul buku harus diisi/i);
    const authorError = await screen.findByText(/nama penulis harus diisi/i);
    
    expect(titleError).toBeInTheDocument();
    expect(authorError).toBeInTheDocument();
  });

  test('validates minimum character length', async () => {
    renderWithProvider(<BookForm />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    fireEvent.change(titleInput, { target: { value: 'Ab' } });
    fireEvent.change(authorInput, { target: { value: 'Cd' } });
    fireEvent.click(submitButton);

    // FIXED: Gunakan findByText untuk masing-masing error
    const titleError = await screen.findByText(/judul buku minimal 3 karakter/i);
    const authorError = await screen.findByText(/nama penulis minimal 3 karakter/i);
    
    expect(titleError).toBeInTheDocument();
    expect(authorError).toBeInTheDocument();
  });

  test('clears validation errors when user types', async () => {
    renderWithProvider(<BookForm />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    // Trigger validation error
    fireEvent.click(submitButton);
    
    const errorMessage = await screen.findByText(/judul buku harus diisi/i);
    expect(errorMessage).toBeInTheDocument();

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

  test('displays correct title for edit mode', () => {
    const editBook = {
      id: '1',
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'owned'
    };

    renderWithProvider(<BookForm editBook={editBook} />);
    
    expect(screen.getByText(/edit buku/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Author')).toBeInTheDocument();
  });

  test('button shows correct text when submitting', async () => {
    renderWithProvider(<BookForm />);
    
    const titleInput = screen.getByLabelText(/judul buku/i);
    const authorInput = screen.getByLabelText(/penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah buku/i });

    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
    fireEvent.change(authorInput, { target: { value: 'Valid Author' } });
    
    // Submit form
    fireEvent.click(submitButton);

    // Button should show "Menyimpan..." while submitting
    const savingButton = await screen.findByText(/menyimpan/i);
    expect(savingButton).toBeInTheDocument();
  });
});