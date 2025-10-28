/**
 * usePagination hook type definitions
 */

/**
 * Pagination options for usePagination hook
 */
export interface UsePaginationOptions {
  /**
   * Initial page number (1-indexed)
   * @default 1
   */
  initialPage?: number;

  /**
   * Number of items per page
   * @default 10
   */
  pageSize?: number;

  /**
   * Enable server-side pagination mode
   * When true, expects data to be already paginated from server
   * @default false
   */
  serverSide?: boolean;

  /**
   * Total number of items on server (for server-side pagination)
   * Required when serverSide is true
   */
  totalItems?: number;

  /**
   * Callback triggered when page changes (for server-side pagination)
   * Use this to fetch new data from server
   * @param page - The new page number
   */
  onPageChange?: (page: number) => void;
}

/**
 * Return type for usePagination hook
 */
export interface UsePaginationReturn<T> {
  /**
   * Paginated data for current page
   */
  paginatedData: T[];

  /**
   * Current page number (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Total number of items
   */
  totalItems: number;

  /**
   * Start index of current page (1-indexed for display)
   */
  startIndex: number;

  /**
   * End index of current page (1-indexed for display)
   */
  endIndex: number;

  /**
   * Whether there is a previous page
   */
  hasPrevious: boolean;

  /**
   * Whether there is a next page
   */
  hasNext: boolean;

  /**
   * Go to a specific page
   */
  goToPage: (page: number) => void;

  /**
   * Go to next page
   */
  nextPage: () => void;

  /**
   * Go to previous page
   */
  previousPage: () => void;

  /**
   * Go to first page
   */
  firstPage: () => void;

  /**
   * Go to last page
   */
  lastPage: () => void;

  /**
   * Reset pagination to initial page
   */
  resetPagination: () => void;
}