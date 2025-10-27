/**
 * AppLayout component type definitions
 */

import { ReactNode } from 'react';

/**
 * AppLayout props
 */
export interface AppLayoutProps {
  /**
   * Main content to render
   */
  children: ReactNode;

  /**
   * Current active page
   */
  currentPage?: string;

  /**
   * Page navigation handler
   */
  onNavigate?: (page: string) => void;
}
