/**
 * useFilter hook type definitions
 */

/**
 * Filter function type
 */
export type FilterFunction<T> = (item: T) => boolean;

/**
 * Filter options for useFilter hook
 */
export interface UseFilterOptions<T> {
  /**
   * Initial filter function
   */
  initialFilter?: FilterFunction<T>;
}

/**
 * Return type for useFilter hook
 */
export interface UseFilterReturn<T> {
  /**
   * Filtered data array
   */
  filteredData: T[];

  /**
   * Current filter function
   */
  filterFunction: FilterFunction<T> | null;

  /**
   * Set filter function
   */
  setFilter: (filterFn: FilterFunction<T> | null) => void;

  /**
   * Clear filter (show all data)
   */
  clearFilter: () => void;

  /**
   * Filter by specific field value
   */
  filterByField: (key: keyof T, value: unknown) => void;

  /**
   * Filter by search term (searches all string fields)
   */
  filterBySearch: (searchTerm: string) => void;
}
