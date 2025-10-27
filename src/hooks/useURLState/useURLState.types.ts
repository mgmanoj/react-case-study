/**
 * useURLState hook type definitions
 */

/**
 * Return type for useURLState hook
 */
export interface UseURLStateReturn<T> {
  /**
   * Current value from URL (or default)
   */
  value: T;

  /**
   * Set value and update URL
   */
  setValue: (value: T) => void;

  /**
   * Clear value from URL (use default)
   */
  clearValue: () => void;
}
