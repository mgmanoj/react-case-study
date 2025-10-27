/**
 * Pagination Component
 * 
 * A flexible pagination component with page numbers, navigation buttons,
 * and info display.
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 *   startIndex={startIndex}
 *   endIndex={endIndex}
 *   totalItems={totalItems}
 * />
 * ```
 */

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from './Pagination.types';
import { PaginationButton } from './PaginationButton';
import { PaginationInfo } from './PaginationInfo';
import { PaginationEllipsis } from './PaginationEllipsis';
import { calculatePageRange } from './Pagination.utils';
import { Icon } from '@/components/atoms/Icon';
import { MAX_VISIBLE_PAGES } from '@/constants';

export const Pagination = React.memo<PaginationProps>(
  ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = MAX_VISIBLE_PAGES,
    showInfo = true,
    startIndex,
    endIndex,
    totalItems,
    className = '',
    ...rest
  }) => {
    // Calculate page range
    const pageRange = calculatePageRange(currentPage, totalPages, maxVisible);

    // Handlers
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number) => {
      onPageChange(page);
    };

    const containerClasses = [
      'flex flex-col sm:flex-row items-center justify-between gap-4 mt-6',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses} {...rest}>
        {/* Info Text */}
        {showInfo && startIndex !== undefined && endIndex !== undefined && totalItems !== undefined && (
          <PaginationInfo start={startIndex} end={endIndex} total={totalItems} />
        )}

        {/* Page Controls */}
        <div className="flex items-center gap-2" role="navigation" aria-label="Pagination">
          {/* Previous Button */}
          <PaginationButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            ariaLabel="Go to previous page"
          >
            <Icon icon={ChevronLeft} size="sm" decorative />
          </PaginationButton>

          {/* Page Numbers */}
          {pageRange.map((page, index) => {
            if (page === 'ellipsis') {
              return <PaginationEllipsis key={`ellipsis-${index}`} />;
            }

            return (
              <PaginationButton
                key={page}
                onClick={() => handlePageClick(page)}
                isActive={page === currentPage}
                ariaLabel={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </PaginationButton>
            );
          })}

          {/* Next Button */}
          <PaginationButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            ariaLabel="Go to next page"
          >
            <Icon icon={ChevronRight} size="sm" decorative />
          </PaginationButton>
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
