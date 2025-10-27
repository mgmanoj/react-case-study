/**
 * PaginationEllipsis Component
 * 
 * Ellipsis indicator for pagination.
 */

import React from 'react';

export const PaginationEllipsis: React.FC = () => {
  return (
    <span
      className="px-3 py-2 text-sm text-gray-500"
      aria-hidden="true"
    >
      ...
    </span>
  );
};

PaginationEllipsis.displayName = 'PaginationEllipsis';
