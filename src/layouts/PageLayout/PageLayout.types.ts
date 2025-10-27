/**
 * PageLayout component type definitions
 */

import { ReactNode } from 'react';

/**
 * PageLayout props
 */
export interface PageLayoutProps {
  /**
   * Page content
   */
  children: ReactNode;

  /**
   * Page title
   */
  title?: string;

  /**
   * Page description
   */
  description?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
