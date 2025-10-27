/**
 * DataTableCell Component
 * 
 * Individual table cell with custom rendering support.
 */

import { DataTableCellProps } from './DataTable.types';
import {
  getCellValue,
  formatCellContent,
  getAlignmentClass,
} from './DataTable.utils';

export function DataTableCell<T extends Record<string, unknown>>({
  item,
  index,
  column,
}: DataTableCellProps<T>) {
  const { key, render, align = 'left', cellProps = {} } = column;

  // Get cell content
  const cellContent = render
    ? render(item, index)
    : formatCellContent(getCellValue(item, key));

  // Cell classes
  const cellClasses = [
    'px-6 py-4 whitespace-nowrap',
    getAlignmentClass(align),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <td className={cellClasses} {...cellProps}>
      {render ? (
        cellContent
      ) : (
        <div className="text-sm text-gray-900">{cellContent}</div>
      )}
    </td>
  );
}

DataTableCell.displayName = 'DataTableCell';
