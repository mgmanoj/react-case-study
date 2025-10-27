/**
 * useSort hook type definitions
 */

import { SortDirection, SortConfig } from '@/types';

/**
 * Sort options for useSort hook
 */
export interface UseSortOptions<T> {
  /**
   * Initial sort key
   */
  initialKey?: keyof T | null;

  /**
   * Initial sort direction
   * @default 'asc'
   */
  initialDirection?: SortDirection;
}

/**
 * Return type for useSort hook
 */
export interface UseSortReturn<T> {
  /**
   * Sorted data array
   */
  sortedData: T[];

  /**
   * Current sort configuration
   */
  sortConfig: SortConfig<T>;

  /**
   * Handle sort change
   */
  handleSort: (key: keyof T) => void;

  /**
   * Reset sort to initial state
   */
  resetSort: () => void;

  /**
   * Set sort configuration manually
   */
  setSortConfig: (config: SortConfig<T>) => void;
}
