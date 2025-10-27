/**
 * Button component type definitions
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Variant, Size } from '@/types';

/**
 * Button variant type
 */
export type ButtonVariant = Variant;

/**
 * Button size type
 */
export type ButtonSize = Exclude<Size, 'xs' | 'xl'>;

/**
 * Button props interface
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Button visual variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;

  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;
}
