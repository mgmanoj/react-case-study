/**
 * Skeleton Component
 * 
 * A loading placeholder component that mimics content structure.
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * ```
 */

import { SkeletonProps } from './Skeleton.types';

export function Skeleton({
  width, 
  height, 
  circle = false, 
  className = '', 
  ...rest 
}: SkeletonProps) {
  const styles: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const skeletonClasses = [
    'animate-pulse bg-gray-300',
    circle ? 'rounded-full' : 'rounded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={skeletonClasses}
      style={styles}
      aria-busy="true"
      aria-live="polite"
      {...rest}
    />
  );
};

Skeleton.displayName = 'Skeleton';
