/**
 * Product type definitions
 */

/**
 * Product entity
 */
export interface Product extends Record<string, unknown> {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

/**
 * Product category type
 */
export type ProductCategory = string | 'all';
