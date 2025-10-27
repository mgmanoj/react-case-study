/**
 * PaginationInfo Component
 * 
 * Displays pagination information text (e.g., "Showing 1-10 of 100").
 */

import React from 'react';
import { PaginationInfoProps } from './Pagination.types';

export const PaginationInfo = React.memo<PaginationInfoProps>(
  ({ start, end, total, className = '' }) => {
    const infoClasses = ['text-sm text-gray-600', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={infoClasses} role="status" aria-live="polite">
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </div>
    );
  }
);

PaginationInfo.displayName = 'PaginationInfo';
