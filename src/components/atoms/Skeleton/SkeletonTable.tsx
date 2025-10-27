/**
 * SkeletonTable Component
 * 
 * Skeleton for table content with rows and columns.
 * 
 * @example
 * ```tsx
 * <SkeletonTable rows={10} columns={4} />
 * ```
 */

import { Skeleton } from './Skeleton';
import { SkeletonTableProps } from './Skeleton.types';

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          {showHeader && (
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <th
                    key={`header-${colIndex}`}
                    className="px-6 py-3 text-left"
                  >
                    <Skeleton width="80%" height="16px" />
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    <Skeleton
                      width={colIndex === 0 ? '90%' : '70%'}
                      height="16px"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SkeletonTable.displayName = 'SkeletonTable';
