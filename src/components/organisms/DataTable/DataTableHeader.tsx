/**
 * DataTableHeader Component
 * 
 * Table header with sortable columns.
 */

import { DataTableHeaderProps } from './DataTable.types';
import { DataTableColumn } from './DataTableColumn';

export function DataTableHeader<T extends Record<string, unknown>>({
  columns,
  sortConfig,
  onSort,
}: DataTableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {columns.map((column) => (
          <DataTableColumn<T>
            key={String(column.key)}
            column={column}
            sortConfig={sortConfig}
            onSort={onSort}
          />
        ))}
      </tr>
    </thead>
  );
}

DataTableHeader.displayName = 'DataTableHeader';
