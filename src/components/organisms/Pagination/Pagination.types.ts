/**
 * Pagination component type definitions
 */

import { HTMLAttributes, ReactNode } from 'react';

/**
 * Pagination props
 */
export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current page number (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Page change handler
   */
  onPageChange: (page: number) => void;

  /**
   * Maximum number of visible page buttons
   * @default 5
   */
  maxVisible?: number;

  /**
   * Whether to show info text
   * @default true
   */
  showInfo?: boolean;

  /**
   * Start index for info text
   */
  startIndex?: number;

  /**
   * End index for info text
   */
  endIndex?: number;

  /**
   * Total number of items
   */
  totalItems?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Pagination Button props
 */
export interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Whether the button is active
   * @default false
   */
  isActive?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * ARIA label
   */
  ariaLabel?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Pagination Info props
 */
export interface PaginationInfoProps {
  /**
   * Start index
   */
  start: number;

  /**
   * End index
   */
  end: number;

  /**
   * Total items
   */
  total: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}
