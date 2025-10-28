/**
 * DataTable Component
 * 
 * A generic, flexible table component with sorting, custom rendering,
 * and compound pattern support.
 * 
 * @example
 * ```tsx
 * <DataTable
 *   data={products}
 *   columns={columns}
 *   sortConfig={sortConfig}
 *   onSort={handleSort}
 * />
 * ```
 */

import { DataTableProps } from './DataTable.types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { getDefaultRowKey } from './DataTable.utils';
import { JSX, memo, MemoExoticComponent } from 'react';

function DataTableComponent<T extends Record<string, unknown>>({
  data,
  columns,
  sortConfig,
  onSort,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  striped = false,
  hoverable = true,
  onRowClick,
  getRowKey = getDefaultRowKey,
}: DataTableProps<T>) {
  // Container classes
  const containerClasses = [
    'bg-white rounded-lg shadow overflow-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <DataTableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={onSort}
          />

          {/* Table Body */}
          {!loading && data.length > 0 && (
            <DataTableBody
              data={data}
              columns={columns}
              onRowClick={onRowClick}
              getRowKey={getRowKey}
              hoverable={hoverable}
              striped={striped}
            />
          )}
        </table>

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

DataTableComponent.displayName = 'DataTable';

/**
 * Memoized DataTable with custom comparison function
 * to prevent unnecessary re-renders.
 */

export const DataTable = memo(DataTableComponent) as <T>(props: DataTableProps<T>) => JSX.Element;

(DataTable as MemoExoticComponent<any>).displayName = 'DataTable';