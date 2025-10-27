/**
 * useFilter utility functions
 */

import { FilterFunction } from './useFilter.types';

/**
 * Filter data using a filter function
 * @param data - Array to filter
 * @param filterFn - Filter function
 * @returns Filtered array
 */
export const filterData = <T>(
  data: T[],
  filterFn: FilterFunction<T> | null
): T[] => {
  if (!filterFn) {
    return data;
  }
  return data.filter(filterFn);
};

/**
 * Create a filter function for a specific field value
 * @param key - Field key
 * @param value - Value to match
 * @returns Filter function
 */
export const createFieldFilter = <T>(
  key: keyof T,
  value: unknown
): FilterFunction<T> => {
  return (item: T) => {
    // Handle "all" or empty value (show everything)
    if (value === 'all' || value === '' || value === null || value === undefined) {
      return true;
    }
    return item[key] === value;
  };
};

/**
 * Create a search filter function (searches all string fields)
 * @param searchTerm - Term to search for
 * @returns Filter function
 */
export const createSearchFilter = <T extends Record<string, unknown>>(
  searchTerm: string
): FilterFunction<T> => {
  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  return (item: T) => {
    // Empty search term: show all
    if (!lowerSearchTerm) {
      return true;
    }

    // Search in all string fields
    return Object.values(item).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      // Convert numbers to strings for search
      if (typeof value === 'number') {
        return String(value).includes(lowerSearchTerm);
      }
      return false;
    });
  };
};
