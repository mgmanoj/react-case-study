/**
 * FilterBar component type definitions
 */

import { ReactNode } from 'react';

export interface FilterBarProps {
  /**
   * Filter controls (Select, Input, etc.)
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Optional title for the filter bar
   */
  title?: string;
}
