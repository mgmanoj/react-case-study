/**
 * FilterBar Component
 * 
 * A container for filter controls with optional title.
 * Designed to be composable with any filter components (Select, Input, DatePicker, etc.)
 * 
 * @example
 * ```tsx
 * <FilterBar title="Filter Products">
 *   <Select name="category" label="Category" ... />
 *   <Select name="status" label="Status" ... />
 * </FilterBar>
 * ```
 */

import { FilterBarProps } from './FilterBar.types';

export function FilterBar({
  children,
  className = '',
  title,
}: FilterBarProps) {
  const containerClasses = [
    'bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Title and Reset Button */}
      {title && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
        </div>
      )}

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

FilterBar.displayName = 'FilterBar';
