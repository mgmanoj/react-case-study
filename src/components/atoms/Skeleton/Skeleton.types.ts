/**
 * Skeleton component type definitions
 */

import { HTMLAttributes } from 'react';

/**
 * Base Skeleton props
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   */
  width?: string | number;

  /**
   * Height of the skeleton
   */
  height?: string | number;

  /**
   * Whether the skeleton is circular
   * @default false
   */
  circle?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Skeleton Table props
 */
export interface SkeletonTableProps {
  /**
   * Number of rows to display
   * @default 5
   */
  rows?: number;

  /**
   * Number of columns to display
   * @default 4
   */
  columns?: number;

  /**
   * Whether to show the table header
   * @default true
   */
  showHeader?: boolean;
}

/**
 * Skeleton Card props
 */
export interface SkeletonCardProps {
  /**
   * Number of cards to display
   * @default 1
   */
  count?: number;

  /**
   * Whether to show the card image
   * @default true
   */
  showImage?: boolean;
}
