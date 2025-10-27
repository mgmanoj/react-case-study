/**
 * Button variant configurations
 */

import { ButtonVariant, ButtonSize } from './Button.types';

/**
 * Variant class mappings
 */
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
  info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
};

/**
 * Size class mappings
 */
export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Base button classes
 */
export const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
