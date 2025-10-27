/**
 * Button Component
 * 
 * A flexible, accessible button component with multiple variants and sizes.
 * Supports loading states, icons, and full keyboard navigation.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */

import { ButtonProps } from './Button.types';
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from './Button.variants';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  // Combine all classes
  const buttonClasses = [
    BUTTON_BASE_CLASSES,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine if button should be disabled
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      {...rest}
    >
      {/* Left Icon */}
      {leftIcon && !isLoading && (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <span className="mr-2 flex items-center">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}

      {/* Button Text */}
      <span>{children}</span>

      {/* Right Icon */}
      {rightIcon && !isLoading && (
        <span className="ml-2 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

Button.displayName = 'Button';
