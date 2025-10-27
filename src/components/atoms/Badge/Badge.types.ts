/**
 * Badge component type definitions
 */

import { HTMLAttributes, ReactNode } from 'react';
import { Variant } from '@/types';

/**
 * Badge variant type
 */
export type BadgeVariant = Variant;

/**
 * Badge props interface
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content
   */
  children: ReactNode;

  /**
   * Badge visual variant
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the badge is rounded (pill shape)
   * @default true
   */
  rounded?: boolean;
}
