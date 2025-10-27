/**
 * useSort utility functions
 */

import { SortDirection } from '@/types';

/**
 * Get the next sort direction
 * @param currentDirection - Current sort direction
 * @returns Next sort direction
 */
export const getNextSortDirection = (
  currentDirection: SortDirection
): SortDirection => {
  if (currentDirection === 'none') return 'asc';
  if (currentDirection === 'asc') return 'desc';
  return 'asc'; // Reset to asc after desc
};

/**
 * Compare two values for sorting
 * @param a - First value
 * @param b - Second value
 * @param direction - Sort direction
 * @returns Comparison result
 */
export const compareValues = <T>(
  a: T,
  b: T,
  direction: SortDirection
): number => {
  // Handle null/undefined
  if (a == null && b == null) return 0;
  if (a == null) return direction === 'asc' ? 1 : -1;
  if (b == null) return direction === 'asc' ? -1 : 1;

  // String comparison
  if (typeof a === 'string' && typeof b === 'string') {
    const comparison = a.toLowerCase().localeCompare(b.toLowerCase());
    return direction === 'asc' ? comparison : -comparison;
  }

  // Number comparison
  if (typeof a === 'number' && typeof b === 'number') {
    return direction === 'asc' ? a - b : b - a;
  }

  // Boolean comparison
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    const aNum = a ? 1 : 0;
    const bNum = b ? 1 : 0;
    return direction === 'asc' ? aNum - bNum : bNum - aNum;
  }

  // Date comparison
  if (a instanceof Date && b instanceof Date) {
    return direction === 'asc'
      ? a.getTime() - b.getTime()
      : b.getTime() - a.getTime();
  }

  // Fallback: convert to string
  const aString = String(a);
  const bString = String(b);
  const comparison = aString.localeCompare(bString);
  return direction === 'asc' ? comparison : -comparison;
};

/**
 * Sort an array of objects by a key
 * @param data - Array to sort
 * @param key - Key to sort by
 * @param direction - Sort direction
 * @returns Sorted array
 */
export const sortData = <T extends Record<string, unknown>>(
  data: T[],
  key: keyof T | null,
  direction: SortDirection
): T[] => {
  // No sorting needed
  if (!key || direction === 'none') {
    return data;
  }

  // Create a copy to avoid mutating original
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    return compareValues(aValue, bValue, direction);
  });
};
