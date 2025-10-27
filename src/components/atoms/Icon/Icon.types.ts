/**
 * Icon component type definitions
 */

import { LucideIcon } from 'lucide-react';
import { Size } from '@/types';

/**
 * Icon size type
 */
export type IconSize = Size;

/**
 * Icon props interface
 */
export interface IconProps {
  /**
   * Lucide icon component
   */
  icon: LucideIcon;

  /**
   * Icon size
   * @default 'md'
   */
  size?: IconSize;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default false
   */
  decorative?: boolean;
}
