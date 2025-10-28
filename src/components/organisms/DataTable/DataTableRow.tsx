/**
 * DataTableRow Component
 * 
 * Individual table row.
 */

import { JSX, memo, MemoExoticComponent } from 'react';
import { DataTableRowProps } from './DataTable.types';
import { DataTableCell } from './DataTableCell';

function DataTableRowComponent<T extends Record<string, unknown>>({
  item,
  index,
  columns,
  onClick,
  hoverable = true,
  striped = false,
}: DataTableRowProps<T>) {
  // Handle row click
  const handleClick = () => {
    if (onClick) {
      onClick(item, index);
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick();
    }
  };

  // Row classes
  const rowClasses = [
    hoverable ? 'hover:bg-gray-50 transition-colors' : '',
    striped && index % 2 === 1 ? 'bg-gray-50' : '',
    onClick ? 'cursor-pointer' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr
      className={rowClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {columns.map((column) => (
        <DataTableCell<T>
          key={String(column.key)}
          item={item}
          index={index}
          column={column}
        />
      ))}
    </tr>
  );
}

DataTableRowComponent.displayName = 'DataTableRow';

/**
 * Memoized DataTableRow - CRITICAL PERFORMANCE OPTIMIZATION
 * Prevents unnecessary re-renders of rows whose data has not changed.
 */
export const DataTableRow = memo(DataTableRowComponent) as <T>(props: DataTableRowProps<T>) => JSX.Element;

(DataTableRow as MemoExoticComponent<any>).displayName = 'DataTableRow';