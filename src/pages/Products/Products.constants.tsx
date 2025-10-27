/**
 * Products page constants
 */

import { ColumnDef } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Product } from './Products.types';
import { formatCurrency } from '@/utils/format';

/**
 * Product table column definitions
 */
export const PRODUCT_COLUMNS: ColumnDef<Product>[] = [
  {
    key: 'name',
    header: 'Product Name',
    sortable: true,
    render: (product) => (
      <span className="font-medium text-gray-900">{product.name}</span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
    render: (product) => (
      <Badge variant="info">{product.category}</Badge>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    sortable: true,
    align: 'right',
    render: (product) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(product.price)}
      </span>
    ),
  },
  {
    key: 'stock',
    header: 'Stock',
    align: 'right',
    render: (product) => (
      <span className="text-gray-700">{product.stock} units</span>
    ),
  },
];

/**
 * Items per page for pagination
 */
export const PRODUCTS_PAGE_SIZE = 10;
