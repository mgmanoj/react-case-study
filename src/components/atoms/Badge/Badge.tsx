/**
 * Badge Component
 * 
 * A small visual indicator component for categories, statuses, or labels.
 * Supports multiple variants and shapes.
 * 
 * @example
 * ```tsx
 * <Badge variant="info">Electronics</Badge>
 * ```
 */

import { BadgeProps } from './Badge.types';
import { BADGE_BASE_CLASSES, BADGE_VARIANTS } from './Badge.variants';

export function Badge({
  children, 
  variant = 'primary', 
  className = '', 
  rounded = true, 
  ...rest 
}: BadgeProps){
  // Combine all classes
  const badgeClasses = [
    BADGE_BASE_CLASSES,
    BADGE_VARIANTS[variant],
    rounded ? 'rounded-full' : 'rounded-md',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
