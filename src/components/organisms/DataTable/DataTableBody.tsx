/**
 * DataTableBody Component
 * 
 * Table body with rows.
 */

import { DataTableBodyProps } from './DataTable.types';
import { DataTableRow } from './DataTableRow';

export function DataTableBody<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  getRowKey,
  hoverable = true,
  striped = false,
}: DataTableBodyProps<T>) {
  return (
    <tbody className="divide-y divide-gray-200">
      {data.map((item, index) => {
        const rowKey = getRowKey ? getRowKey(item, index) : index;
        
        return (
          <DataTableRow<T>
            key={rowKey}
            item={item}
            index={index}
            columns={columns}
            onClick={onRowClick}
            rowKey={rowKey}
            hoverable={hoverable}
            striped={striped}
          />
        );
      })}
    </tbody>
  );
}

DataTableBody.displayName = 'DataTableBody';
