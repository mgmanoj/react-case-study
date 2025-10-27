/**
 * Icon Component
 * 
 * A wrapper for Lucide React icons with consistent sizing and accessibility.
 * 
 * @example
 * ```tsx
 * <Icon icon={ChevronUp} size="md" ariaLabel="Sort ascending" />
 * ```
 */

import { IconProps } from './Icon.types';

/**
 * Size mappings in pixels
 */
const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export function Icon({
  icon: IconComponent,
  size = 'md',
  className = '',
  ariaLabel,
  decorative = false,
}: IconProps){
  const iconSize = ICON_SIZES[size];

  return (
    <IconComponent
      size={iconSize}
      className={className}
      aria-label={!decorative && ariaLabel ? ariaLabel : undefined}
      aria-hidden={decorative}
      role={!decorative && ariaLabel ? 'img' : undefined}
    />
  );
};

Icon.displayName = 'Icon';
