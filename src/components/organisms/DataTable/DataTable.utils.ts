/**
 * DataTable utility functions
 */

import { ColumnDef } from './DataTable.types';

/**
 * Get default row key
 * @param item - The data item
 * @param index - The row index
 * @returns A unique key for the row
 */
export const getDefaultRowKey = <T,>(item: T, index: number): string => {
  // Try to use 'id' property if it exists
  if (item && typeof item === 'object' && 'id' in item) {
    return String(item.id);
  }
  // Fallback to index
  return `row-${index}`;
};

/**
 * Get cell value from item
 * @param item - The data item
 * @param key - The column key
 * @returns The cell value
 */
export const getCellValue = <T,>(item: T, key: keyof T): unknown => {
  return item[key];
};

/**
 * Format cell content
 * @param value - The cell value
 * @returns Formatted string
 */
export const formatCellContent = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

/**
 * Get column width style
 * @param width - Width value
 * @returns CSS width style
 */
export const getColumnWidth = (
  width?: string | number
): React.CSSProperties => {
  if (!width) return {};
  return {
    width: typeof width === 'number' ? `${width}px` : width,
  };
};

/**
 * Get text alignment class
 * @param align - Alignment value
 * @returns Tailwind alignment class
 */
export const getAlignmentClass = (
  align: 'left' | 'center' | 'right' = 'left'
): string => {
  const alignmentMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  return alignmentMap[align];
};
