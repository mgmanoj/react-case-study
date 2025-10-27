/**
 * PaginationButton Component
 * 
 * Individual pagination button.
 */

import React from 'react';
import { PaginationButtonProps } from './Pagination.types';

export const PaginationButton = React.memo<PaginationButtonProps>(
  ({
    children,
    isActive = false,
    disabled = false,
    onClick,
    ariaLabel,
    className = '',
    ...rest
  }) => {
    const buttonClasses = [
      'px-3 py-2 min-w-[40px] text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        type="button"
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

PaginationButton.displayName = 'PaginationButton';
