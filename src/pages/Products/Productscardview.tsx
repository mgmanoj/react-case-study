/**
 * ProductsCardView Component
 * 
 * Mobile card view for products
 * Note: Sorting is now handled by the unified FilterBar
 */

import { Card } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { formatCurrency } from '@/utils/format';
import { Product } from './Products.types';

export interface ProductsCardViewProps {
  data: Product[];
}

export function ProductsCardView({ data }: ProductsCardViewProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((product) => (
        <Card key={product.id} hoverable>
          <Card.Header>
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <Badge variant="info">{product.category}</Badge>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className="text-gray-900">{product.stock} units</span>
              </div>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

ProductsCardView.displayName = 'ProductsCardView';