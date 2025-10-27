/**
 * usePagination utility functions
 */

/**
 * Calculate total number of pages
 * @param totalItems - Total number of items
 * @param pageSize - Items per page
 * @returns Total pages
 */
export const calculateTotalPages = (
  totalItems: number,
  pageSize: number
): number => {
  if (pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
};

/**
 * Calculate start index for current page (0-indexed)
 * @param currentPage - Current page (1-indexed)
 * @param pageSize - Items per page
 * @returns Start index (0-indexed)
 */
export const calculateStartIndex = (
  currentPage: number,
  pageSize: number
): number => {
  return (currentPage - 1) * pageSize;
};

/**
 * Calculate end index for current page (0-indexed, exclusive)
 * @param currentPage - Current page (1-indexed)
 * @param pageSize - Items per page
 * @returns End index (0-indexed, exclusive)
 */
export const calculateEndIndex = (
  currentPage: number,
  pageSize: number
): number => {
  return currentPage * pageSize;
};

/**
 * Validate page number
 * @param page - Page number to validate
 * @param totalPages - Total number of pages
 * @returns Valid page number
 */
export const validatePageNumber = (
  page: number,
  totalPages: number
): number => {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
};

/**
 * Paginate data array
 * @param data - Full data array
 * @param currentPage - Current page (1-indexed)
 * @param pageSize - Items per page
 * @returns Paginated slice of data
 */
export const paginateData = <T>(
  data: T[],
  currentPage: number,
  pageSize: number
): T[] => {
  const startIndex = calculateStartIndex(currentPage, pageSize);
  const endIndex = calculateEndIndex(currentPage, pageSize);
  return data.slice(startIndex, endIndex);
};
