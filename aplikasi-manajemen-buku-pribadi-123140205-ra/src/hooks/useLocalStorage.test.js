import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  test('returns stored value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  test('handles objects and arrays correctly', () => {
    const testObject = { name: 'Test', count: 5 };
    const { result } = renderHook(() => useLocalStorage('testObject', testObject));
    
    expect(result.current[0]).toEqual(testObject);
    
    act(() => {
      result.current[1]({ name: 'Updated', count: 10 });
    });

    expect(result.current[0]).toEqual({ name: 'Updated', count: 10 });
  });

  test('handles function updates like useState', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));
    
    act(() => {
      result.current[1](prevValue => prevValue + 1);
    });

    expect(result.current[0]).toBe(1);
    
    act(() => {
      result.current[1](prevValue => prevValue + 5);
    });

    expect(result.current[0]).toBe(6);
  });

  test('handles localStorage errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage.setItem to throw error
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('Storage full');
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });
});