/**
 * useResponsive Hook
 * 
 * Hook for detecting current responsive breakpoint.
 * Listens to window resize events and updates breakpoint state.
 * 
 * @example
 * ```tsx
 * const { isMobile, isDesktop } = useResponsive();
 * 
 * return isMobile ? <MobileView /> : <DesktopView />;
 * ```
 */

import { useState, useEffect } from 'react';
import { UseResponsiveReturn } from './useResponsive.types';
import { getBreakpointFromWidth } from './useResponsive.constants';

export function useResponsive(): UseResponsiveReturn {
  // Get initial window width (handle SSR)
  const getInitialWidth = () => {
    if (typeof window === 'undefined') return 1024; // Default to desktop for SSR
    return window.innerWidth;
  };

  const [width, setWidth] = useState(getInitialWidth);

  // Update width on resize
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Initial call to set correct width
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate breakpoint
  const breakpoint = getBreakpointFromWidth(width);

  // Calculate boolean flags
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isDesktop = breakpoint === 'desktop';
  const isWide = breakpoint === 'wide';
  const isTabletOrAbove = isTablet || isDesktop || isWide;
  const isDesktopOrAbove = isDesktop || isWide;

  return {
    breakpoint,
    width,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isTabletOrAbove,
    isDesktopOrAbove,
  };
}
