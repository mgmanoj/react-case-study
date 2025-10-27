/**
 * useSort Hook
 * 
 * Generic hook for sorting data arrays.
 * Works with any data type that extends Record<string, unknown>.
 * 
 * @example
 * ```tsx
 * const { sortedData, sortConfig, handleSort } = useSort(products);
 * 
 * <DataTable
 *   data={sortedData}
 *   sortConfig={sortConfig}
 *   onSort={handleSort}
 * />
 * ```
 */

import { useState, useMemo, useCallback } from 'react';
import { SortConfig } from '@/types';
import { UseSortOptions, UseSortReturn } from './useSort.types';
import { getNextSortDirection, sortData } from './useSort.utils';

export function useSort<T extends Record<string, unknown>>(
  data: T[],
  options: UseSortOptions<T> = {}
): UseSortReturn<T> {
  const { initialKey = null, initialDirection = 'none' } = options;

  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: initialKey,
    direction: initialDirection,
  });

  /**
   * Sort data based on current configuration
   */
  const sortedData = useMemo(() => {
    return sortData(data, sortConfig.key, sortConfig.direction);
  }, [data, sortConfig.key, sortConfig.direction]);

  /**
   * Handle sort by key
   * Cycles through: none -> asc -> desc -> asc
   */
  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((prev) => {
      // If clicking the same column, cycle through directions
      if (prev.key === key) {
        const nextDirection = getNextSortDirection(prev.direction);
        return {
          key,
          direction: nextDirection,
        };
      }

      // New column: start with ascending
      return {
        key,
        direction: 'asc',
      };
    });
  }, []);

  /**
   * Reset sort to initial state
   */
  const resetSort = useCallback(() => {
    setSortConfig({
      key: initialKey,
      direction: initialDirection,
    });
  }, [initialKey, initialDirection]);

  return {
    sortedData,
    sortConfig,
    handleSort,
    resetSort,
    setSortConfig,
  };
}
