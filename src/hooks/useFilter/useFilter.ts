/**
 * useFilter Hook
 * 
 * Generic hook for filtering data arrays.
 * Works with any data type.
 * 
 * @example
 * ```tsx
 * const { filteredData, filterByField } = useFilter(products);
 * 
 * // Filter by category
 * filterByField('category', 'Electronics');
 * ```
 */

import { useState, useMemo, useCallback } from 'react';
import { FilterFunction, UseFilterOptions, UseFilterReturn } from './useFilter.types';
import { filterData, createFieldFilter, createSearchFilter } from './useFilter.utils';

export function useFilter<T extends Record<string, unknown>>(
  data: T[],
  options: UseFilterOptions<T> = {}
): UseFilterReturn<T> {
  const { initialFilter = null } = options;

  // Filter function state
  const [filterFunction, setFilterFunction] = useState<FilterFunction<T> | null>(
    initialFilter
  );

  /**
   * Filter data based on current filter function
   */
  const filteredData = useMemo(() => {
    return filterData(data, filterFunction);
  }, [data, filterFunction]);

  /**
   * Set custom filter function
   */
  const setFilter = useCallback((filterFn: FilterFunction<T> | null) => {
    setFilterFunction(() => filterFn);
  }, []);

  /**
   * Clear all filters
   */
  const clearFilter = useCallback(() => {
    setFilterFunction(null);
  }, []);

  /**
   * Filter by specific field value
   */
  const filterByField = useCallback((key: keyof T, value: unknown) => {
    const filterFn = createFieldFilter<T>(key, value);
    setFilterFunction(() => filterFn);
  }, []);

  /**
   * Filter by search term
   */
  const filterBySearch = useCallback((searchTerm: string) => {
    const filterFn = createSearchFilter<T>(searchTerm);
    setFilterFunction(() => filterFn);
  }, []);

  return {
    filteredData,
    filterFunction,
    setFilter,
    clearFilter,
    filterByField,
    filterBySearch,
  };
}
