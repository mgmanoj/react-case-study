/**
 * useResponsive hook constants
 */

import { BREAKPOINTS } from '@/constants';
import { Breakpoint } from '@/types';

/**
 * Breakpoint thresholds (exported for reuse)
 */
export const BREAKPOINT_VALUES = BREAKPOINTS;

/**
 * Get breakpoint from width
 * @param width - Window width in pixels
 * @returns Current breakpoint
 */
export const getBreakpointFromWidth = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.WIDE) return 'wide';
  if (width >= BREAKPOINTS.DESKTOP) return 'desktop';
  if (width >= BREAKPOINTS.TABLET) return 'tablet';
  return 'mobile';
};
