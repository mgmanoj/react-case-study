/**
 * usePagination Hook
 * 
 * Generic hook for paginating data arrays.
 * Works with any data type.
 * 
 * @example
 * ```tsx
 * const {
 *   paginatedData,
 *   currentPage,
 *   totalPages,
 *   goToPage,
 * } = usePagination(products, { pageSize: 10 });
 * 
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={goToPage}
 * />
 * ```
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { UsePaginationOptions, UsePaginationReturn } from './usePagination.types';
import {
  calculateTotalPages,
  calculateStartIndex,
  validatePageNumber,
  paginateData,
} from './usePagination.utils';

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { initialPage = 1, pageSize = DEFAULT_PAGE_SIZE } = options;

  // Current page state
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = calculateTotalPages(totalItems, pageSize);

  // Validate and adjust current page if needed
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Reset to page 1 when data changes significantly
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  /**
   * Get paginated data for current page
   */
  const paginatedData = useMemo(() => {
    return paginateData(data, currentPage, pageSize);
  }, [data, currentPage, pageSize]);

  /**
   * Calculate display indices (1-indexed for UI)
   */
  const startIndex = useMemo(() => {
    if (totalItems === 0) return 0;
    return calculateStartIndex(currentPage, pageSize) + 1; // +1 for 1-indexed display
  }, [currentPage, pageSize, totalItems]);

  const endIndex = useMemo(() => {
    if (totalItems === 0) return 0;
    const end = currentPage * pageSize;
    return Math.min(end, totalItems); // Don't exceed total items
  }, [currentPage, pageSize, totalItems]);

  /**
   * Check if navigation is available
   */
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  /**
   * Go to specific page
   */
  const goToPage = useCallback(
    (page: number) => {
      const validPage = validatePageNumber(page, totalPages);
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNext]);

  /**
   * Go to previous page
   */
  const previousPage = useCallback(() => {
    if (hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPrevious]);

  /**
   * Go to first page
   */
  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  /**
   * Go to last page
   */
  const lastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  /**
   * Reset to initial page
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasPrevious,
    hasNext,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    resetPagination,
  };
}
