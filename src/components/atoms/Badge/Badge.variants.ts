/**
 * Badge variant configurations
 */

import { BadgeVariant } from './Badge.types';

/**
 * Variant class mappings
 */
export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-cyan-100 text-cyan-800',
  ghost: 'bg-transparent text-gray-700 border border-gray-300',
};

/**
 * Base badge classes
 */
export const BADGE_BASE_CLASSES =
  'inline-flex items-center px-3 py-1 text-xs font-semibold transition-colors';
