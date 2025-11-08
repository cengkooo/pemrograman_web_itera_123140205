import { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

/**
 * Custom hook untuk menghitung statistik buku
 * @returns {object} - Statistik buku
 */
export const useBookStats = () => {
  const { books } = useBooks();

  // Menggunakan useMemo untuk optimasi perhitungan
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter(book => book.status === 'owned').length;
    const reading = books.filter(book => book.status === 'reading').length;
    const wishlist = books.filter(book => book.status === 'wishlist').length;

    // Hitung persentase
    const ownedPercentage = total > 0 ? ((owned / total) * 100).toFixed(1) : 0;
    const readingPercentage = total > 0 ? ((reading / total) * 100).toFixed(1) : 0;
    const wishlistPercentage = total > 0 ? ((wishlist / total) * 100).toFixed(1) : 0;

    return {
      total,
      owned,
      reading,
      wishlist,
      ownedPercentage,
      readingPercentage,
      wishlistPercentage
    };
  }, [books]);

  return stats;
};