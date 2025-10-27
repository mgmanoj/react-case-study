/**
 * Products service
 * 
 * Handles fetching product data.
 * Currently uses mock data with simulated delay.
 */

import productsData from '@/__mocks__/products.json';
import { Product } from './Products.types';
import { MOCK_API_DELAY } from '@/constants';

/**
 * Fetch all products
 * Simulates API call with delay
 * 
 * @returns Promise resolving to products array
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  // Return products (typed)
  return productsData as Product[];
};

/**
 * Get unique categories from products
 * 
 * @param products - Products array
 * @returns Array of unique category names
 */
export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map((product) => product.category);
  return Array.from(new Set(categories)).sort();
};
