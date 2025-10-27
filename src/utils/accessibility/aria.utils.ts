/**
 * ARIA and accessibility utilities
 */

/**
 * Generate unique ID for accessibility
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Create ARIA label for sort button
 * @param column - Column name
 * @param direction - Current sort direction
 * @returns ARIA label string
 */
export const getSortAriaLabel = (
  column: string,
  direction: 'asc' | 'desc' | 'none'
): string => {
  if (direction === 'none') {
    return `Sort by ${column}`;
  }
  const directionText = direction === 'asc' ? 'ascending' : 'descending';
  return `Sorted by ${column} in ${directionText} order. Click to sort in ${
    direction === 'asc' ? 'descending' : 'ascending'
  } order`;
};

/**
 * Create ARIA label for pagination
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @returns ARIA label string
 */
export const getPaginationAriaLabel = (
  currentPage: number,
  totalPages: number
): string => {
  return `Page ${currentPage} of ${totalPages}`;
};

/**
 * Create ARIA live region announcement
 * @param message - Message to announce
 * @returns Object with aria-live attributes
 */
export const createLiveRegion = (message: string) => {
  return {
    'aria-live': 'polite' as const,
    'aria-atomic': 'true',
    role: 'status',
    children: message,
  };
};
