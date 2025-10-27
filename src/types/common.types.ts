/**
 * Common type definitions used across the application
 */

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc' | 'none';

/**
 * Sort configuration
 */
export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Filter configuration
 */
export interface FilterConfig<T> {
  key: keyof T;
  value: string | number | boolean;
  operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
}

/**
 * Generic response type for async operations
 */
export interface AsyncResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Breakpoint names for responsive design
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

/**
 * Generic option type for selects and filters
 */
export interface Option<T = string> {
  label: string;
  value: T;
}

/**
 * Variant types for styled components
 */
export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';

/**
 * Size types for components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Generic callback types
 */
export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;
export type EventCallback<T = Event> = (event: T) => void;
