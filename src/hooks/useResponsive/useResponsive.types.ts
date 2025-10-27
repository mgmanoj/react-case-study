/**
 * useResponsive hook type definitions
 */

import { Breakpoint } from '@/types';

/**
 * Return type for useResponsive hook
 */
export interface UseResponsiveReturn {
  /**
   * Current breakpoint
   */
  breakpoint: Breakpoint;

  /**
   * Current window width
   */
  width: number;

  /**
   * Whether current breakpoint is mobile
   */
  isMobile: boolean;

  /**
   * Whether current breakpoint is tablet
   */
  isTablet: boolean;

  /**
   * Whether current breakpoint is desktop
   */
  isDesktop: boolean;

  /**
   * Whether current breakpoint is wide
   */
  isWide: boolean;

  /**
   * Whether current breakpoint is at least tablet
   */
  isTabletOrAbove: boolean;

  /**
   * Whether current breakpoint is at least desktop
   */
  isDesktopOrAbove: boolean;
}
