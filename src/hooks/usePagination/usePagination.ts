/**
 * usePagination Hook
 * 
 * Generic hook for paginating data arrays with support for both
 * client-side and server-side pagination.
 * 
 * @example Client-side pagination
 * ```tsx
 * const {
 *   paginatedData,
 *   currentPage,
 *   totalPages,
 *   goToPage,
 * } = usePagination(products, { pageSize: 10 });
 * ```
 * 
 * @example Server-side pagination
 * ```tsx
 * const {
 *   paginatedData,
 *   currentPage,
 *   totalPages,
 *   goToPage,
 * } = usePagination(products, { 
 *   pageSize: 10,
 *   serverSide: true,
 *   totalItems: 1000,
 *   onPageChange: (page) => fetchProducts({ page })
 * });
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
  const { 
    initialPage = 1, 
    pageSize = DEFAULT_PAGE_SIZE,
    serverSide = false,
    totalItems: serverTotalItems,
    onPageChange: serverOnPageChange,
  } = options;

  // Current page state
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate pagination values based on mode
  const totalItems = serverSide && serverTotalItems !== undefined 
    ? serverTotalItems 
    : data.length;
  const totalPages = calculateTotalPages(totalItems, pageSize);

  // Validate and adjust current page if needed
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Reset to page 1 when data changes significantly (client-side only)
  useEffect(() => {
    if (!serverSide) {
      setCurrentPage(1);
    }
  }, [data.length, serverSide]);

  /**
   * Get paginated data for current page
   * For server-side pagination, data is already paginated from server
   * For client-side pagination, slice the data array
   */
  const paginatedData = useMemo(() => {
    if (serverSide) {
      // Server-side: data is already paginated
      return data;
    }
    // Client-side: paginate the data array
    return paginateData(data, currentPage, pageSize);
  }, [data, currentPage, pageSize, serverSide]);

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
   * Triggers server-side callback if in server-side mode
   */
  const goToPage = useCallback(
    (page: number) => {
      const validPage = validatePageNumber(page, totalPages);
      setCurrentPage(validPage);
      
      // Trigger server-side page change if applicable
      if (serverSide && serverOnPageChange) {
        serverOnPageChange(validPage);
      }
    },
    [totalPages, serverSide, serverOnPageChange]
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