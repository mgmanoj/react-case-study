/**
 * ProductsTableView Component
 * 
 * Desktop table view for products with sorting
 */

import { DataTable } from '@/components/organisms/DataTable';
import { ColumnDef } from '@/components/organisms/DataTable/DataTable.types';
import { SortConfig } from '@/types';
import { Product } from './Products.types';

export interface ProductsTableViewProps {
  data: Product[];
  columns: ColumnDef<Product>[];
  sortConfig?: SortConfig<Product>;
  onSort?: (key: keyof Product) => void;
}

export function ProductsTableView({
  data,
  columns,
  sortConfig,
  onSort,
}: ProductsTableViewProps) {
  return (
    <DataTable
      data={data}
      columns={columns}
      sortConfig={sortConfig}
      onSort={onSort}
      emptyMessage="No products found"
    />
  );
}

ProductsTableView.displayName = 'ProductsTableView';