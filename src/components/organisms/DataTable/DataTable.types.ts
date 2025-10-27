/**
 * DataTable component type definitions
 */

import { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { SortConfig } from '@/types';

/**
 * Column definition for DataTable
 */
export interface ColumnDef<T> {
  /**
   * Unique key for the column (should match data property)
   */
  key: keyof T;

  /**
   * Column header text
   */
  header: string;

  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Custom render function for cell content
   */
  render?: (item: T, index: number) => ReactNode;

  /**
   * Custom width for the column
   */
  width?: string | number;

  /**
   * Alignment of cell content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Additional header cell props
   */
  headerProps?: ThHTMLAttributes<HTMLTableCellElement>;

  /**
   * Additional cell props
   */
  cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
}

/**
 * DataTable props
 */
export interface DataTableProps<T> {
  /**
   * Array of data items to display
   */
  data: T[];

  /**
   * Column definitions
   */
  columns: ColumnDef<T>[];

  /**
   * Current sort configuration
   */
  sortConfig?: SortConfig<T> | null;

  /**
   * Sort change handler
   */
  onSort?: (key: keyof T) => void;

  /**
   * Whether the table is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Message to display when no data
   * @default 'No data available'
   */
  emptyMessage?: string;

  /**
   * Additional CSS classes for the table container
   */
  className?: string;

  /**
   * Whether to show striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Whether to show hover effect on rows
   * @default true
   */
  hoverable?: boolean;

  /**
   * Row click handler
   */
  onRowClick?: (item: T, index: number) => void;

  /**
   * Custom key extractor for rows
   */
  getRowKey?: (item: T, index: number) => string | number;
}

/**
 * DataTable Header props
 */
export interface DataTableHeaderProps<T> {
  columns: ColumnDef<T>[];
  sortConfig?: SortConfig<T> | null;
  onSort?: (key: keyof T) => void;
}

/**
 * DataTable Body props
 */
export interface DataTableBodyProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T, index: number) => void;
  getRowKey?: (item: T, index: number) => string | number;
  hoverable?: boolean;
  striped?: boolean;
}

/**
 * DataTable Row props
 */
export interface DataTableRowProps<T> {
  item: T;
  index: number;
  columns: ColumnDef<T>[];
  onClick?: (item: T, index: number) => void;
  rowKey: string | number;
  hoverable?: boolean;
  striped?: boolean;
}

/**
 * DataTable Cell props
 */
export interface DataTableCellProps<T> {
  item: T;
  index: number;
  column: ColumnDef<T>;
}

/**
 * DataTable Column (Header) props
 */
export interface DataTableColumnProps<T> {
  column: ColumnDef<T>;
  sortConfig?: SortConfig<T> | null;
  onSort?: (key: keyof T) => void;
}
