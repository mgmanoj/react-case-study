/**
 * Application-wide constants
 */

/**
 * Breakpoint values in pixels
 */
export const BREAKPOINTS = {
  MOBILE: 0,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
} as const;

/**
 * Default page size for pagination
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Available page sizes
 */
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const;

/**
 * Mock API delay in milliseconds
 */
export const MOCK_API_DELAY = 1500;

/**
 * Animation duration in milliseconds
 */
export const ANIMATION_DURATION = 200;

/**
 * Debounce delay for search inputs (ms)
 */
export const SEARCH_DEBOUNCE_DELAY = 300;

/**
 * Maximum visible page numbers in pagination
 */
export const MAX_VISIBLE_PAGES = 5;

/**
 * Sort directions
 */
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none',
} as const;

/**
 * Keyboard keys
 */
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const;
