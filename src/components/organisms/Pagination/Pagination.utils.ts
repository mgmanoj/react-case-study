/**
 * Pagination utility functions
 */

/**
 * Calculate page numbers to display with ellipsis
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum visible page numbers
 * @returns Array of page numbers (or 'ellipsis' string)
 */
export const calculatePageRange = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | 'ellipsis')[] => {
  // If total pages is less than max visible, show all
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const halfVisible = Math.floor(maxVisible / 2);
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  // Adjust if we're near the start
  if (currentPage <= halfVisible) {
    endPage = maxVisible;
  }

  // Adjust if we're near the end
  if (currentPage >= totalPages - halfVisible) {
    startPage = totalPages - maxVisible + 1;
  }

  const pages: (number | 'ellipsis')[] = [];

  // Add first page and ellipsis if needed
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('ellipsis');
    }
  }

  // Add visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('ellipsis');
    }
    pages.push(totalPages);
  }

  return pages;
};

/**
 * Check if page number is valid
 * @param page - Page number to check
 * @param totalPages - Total number of pages
 * @returns Whether the page is valid
 */
export const isValidPage = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages;
};
