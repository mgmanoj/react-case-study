/**
 * DataTableColumn Component
 * 
 * Table header column with optional sorting.
 */

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { DataTableColumnProps } from './DataTable.types';
import { getSortAriaLabel } from '@/utils/accessibility';
import { Icon } from '@/components/atoms/Icon';
import { getColumnWidth, getAlignmentClass } from './DataTable.utils';

export function DataTableColumn<T>({
  column,
  sortConfig,
  onSort,
}: DataTableColumnProps<T>) {
  const { key, header, sortable = false, width, align = 'left', headerProps = {} } = column;

  // Determine if this column is currently sorted
  const isSorted = sortConfig?.key === key;
  const sortDirection = isSorted ? sortConfig.direction : 'none';

  // Get sort icon based on direction
  const getSortIcon = () => {
    if (sortDirection === 'asc') {
      return ArrowUp;
    } else if (sortDirection === 'desc') {
      return ArrowDown;
    }
    return ArrowUpDown;
  };

  const SortIcon = getSortIcon();

  // Handle sort click
  const handleSort = () => {
    if (sortable && onSort) {
      onSort(key);
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (sortable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleSort();
    }
  };

  // Column classes
  const columnClasses = [
    'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
    getAlignmentClass(align),
    sortable ? 'cursor-pointer select-none hover:bg-gray-100 transition-colors' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Column styles
  const columnStyles = getColumnWidth(width);

  return (
    <th
      className={columnClasses}
      style={columnStyles}
      onClick={sortable ? handleSort : undefined}
      onKeyDown={sortable ? handleKeyDown : undefined}
      tabIndex={sortable ? 0 : undefined}
      role={sortable ? 'button' : undefined}
      aria-sort={
        isSorted
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : undefined
      }
      aria-label={sortable ? getSortAriaLabel(header, sortDirection) : undefined}
      {...headerProps}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex-1">{header}</span>
        {sortable && (
          <span className="flex-shrink-0">
            <Icon
              icon={SortIcon}
              size="sm"
              className={isSorted ? 'text-blue-600' : 'text-gray-400'}
              decorative
            />
          </span>
        )}
      </div>
    </th>
  );
}

DataTableColumn.displayName = 'DataTableColumn';