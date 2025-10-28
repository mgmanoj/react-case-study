/**
 * Products Page
 */

import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/layouts/PageLayout';
import { Pagination } from '@/components/organisms/Pagination';
import { FilterBar } from '@/components/organisms/FilterBar';
import { Select } from '@/components/molecules/Select';
import { SkeletonTable } from '@/components/atoms/Skeleton';
import { useSort } from '@/hooks/useSort';
import { usePagination } from '@/hooks/usePagination';
import { useResponsive } from '@/hooks/useResponsive';
import { useURLState } from '@/hooks/useURLState';
import { fetchProducts, getUniqueCategories } from './Products.service';
import { PRODUCT_COLUMNS, PRODUCTS_PAGE_SIZE } from './Products.constants';
import { Product } from './Products.types';
import { ProductsTableView } from './ProductsTableView';
import { ProductsCardView } from './ProductsCardView';

export const Products: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // URL state for persistence
  const { value: selectedCategory, setValue: setSelectedCategory } =
    useURLState<string>('category', 'all');
  const { value: sortKey, setValue: setSortKey } = useURLState<string>('sort', '');
  const { value: sortDir, setValue: setSortDir } = useURLState<string>('dir', '');
  const { value: urlPage, setValue: setUrlPage } = useURLState<number>('page', 1);

  // Responsive detection
  const { isMobile } = useResponsive();

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setCategories(getUniqueCategories(data));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter by category
  const categoryFilteredData = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Sort data
  const { sortedData, sortConfig, handleSort, setSortConfig } = useSort(categoryFilteredData);

  // Sync sort with URL on mount
  useEffect(() => {
    if (sortKey && sortDir) {
      setSortConfig({
        key: sortKey as keyof Product,
        direction: sortDir as 'asc' | 'desc' | 'none',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Update URL when sort changes
  useEffect(() => {
    if (sortConfig.key && sortConfig.direction !== 'none') {
      setSortKey(String(sortConfig.key));
      setSortDir(sortConfig.direction);
    } else {
      setSortKey('');
      setSortDir('');
    }
  }, [sortConfig.key, sortConfig.direction, setSortKey, setSortDir]);

  // Paginate data - ensure urlPage is a number
  const {
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    goToPage,
  } = usePagination(sortedData, {
    initialPage: Number(urlPage) || 1,
    pageSize: PRODUCTS_PAGE_SIZE,
  });

  // Sync pagination with URL
  useEffect(() => {
    if (currentPage !== urlPage) {
      setUrlPage(currentPage);
    }
  }, [currentPage, urlPage, setUrlPage]);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    goToPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortConfig.key, sortConfig.direction]);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Handle sort field change
  const handleSortFieldChange = (value: string) => {
    if (value === 'none') {
      setSortConfig({ key: null as any, direction: 'none' });
    } else {
      // Keep existing direction or default to 'asc'
      const direction = sortConfig.direction === 'none' ? 'asc' : sortConfig.direction;
      setSortConfig({ key: value as keyof Product, direction });
    }
  };

  // Handle sort direction change
  const handleSortDirectionChange = (value: string) => {
    if (sortConfig.key) {
      setSortConfig({ 
        key: sortConfig.key, 
        direction: value as 'asc' | 'desc' 
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout title="Products" description="Manage your product inventory">
        <SkeletonTable rows={10} columns={4} />
      </PageLayout>
    );
  }

  // Prepare options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const sortFieldOptions = [
    { value: 'none', label: 'No Sorting' },
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'category', label: 'Category' },
    { value: 'stock', label: 'Stock' },
  ];

  const sortDirectionOptions = [
    { value: 'asc', label: 'Ascending (A-Z, 0-9)' },
    { value: 'desc', label: 'Descending (Z-A, 9-0)' },
  ];

  const currentSortField = sortConfig.key ? String(sortConfig.key) : 'none';
  const currentSortDirection = sortConfig.direction !== 'none' ? sortConfig.direction : 'asc';

  return (
    <PageLayout title="Products" description="Manage your product inventory">
      
      {/* Unified FilterBar - All filters and sorts in one place */}
      <FilterBar>
        {/* Category Filter */}
        <Select
          name="category"
          label="Category"
          value={selectedCategory}
          options={categoryOptions}
          onChange={handleCategoryChange}
        />

        {/* Sort Field Selector */}
        <Select
          name="sortField"
          label="Sort By"
          value={currentSortField}
          options={sortFieldOptions}
          onChange={handleSortFieldChange}
        />

        {/* Sort Direction Selector - Only show if sorting is active */}
        {sortConfig.key && sortConfig.direction !== 'none' && (
          <Select
            name="sortDirection"
            label="Sort Order"
            value={currentSortDirection}
            options={sortDirectionOptions}
            onChange={handleSortDirectionChange}
          />
        )}
      </FilterBar>

      {/* Desktop: Table View */}
      {!isMobile && (
        <ProductsTableView
          data={paginatedData}
          columns={PRODUCT_COLUMNS}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      )}

      {/* Mobile: Card View */}
      {isMobile && (
        <ProductsCardView data={paginatedData} />
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      )}
    </PageLayout>
  );
};

Products.displayName = 'Products';