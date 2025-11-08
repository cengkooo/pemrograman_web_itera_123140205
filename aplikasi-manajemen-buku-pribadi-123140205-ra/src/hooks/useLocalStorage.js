import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mengelola localStorage
 * @param {string} key - Key untuk localStorage
 * @param {any} initialValue - Nilai awal jika tidak ada di localStorage
 * @returns {[any, function]} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Ambil dari localStorage
      const item = window.localStorage.getItem(key);
      // Parse dan return jika ada, jika tidak return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return wrapped version dari useState setter function yang
  // persist value ke localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function seperti useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save ke localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};