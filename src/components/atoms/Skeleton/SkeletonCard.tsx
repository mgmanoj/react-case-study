/**
 * SkeletonCard Component
 * 
 * Skeleton for card content.
 * 
 * @example
 * ```tsx
 * <SkeletonCard count={3} />
 * ```
 */

import { Skeleton } from './Skeleton';
import { SkeletonCardProps } from './Skeleton.types';

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  count = 1,
  showImage = true,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-card-${index}`}
          className="bg-white rounded-lg shadow p-4"
        >
          {/* Image */}
          {showImage && (
            <Skeleton width="100%" height="150px" className="mb-4" />
          )}

          {/* Title */}
          <Skeleton width="80%" height="20px" className="mb-3" />

          {/* Description lines */}
          <Skeleton width="100%" height="16px" className="mb-2" />
          <Skeleton width="90%" height="16px" className="mb-2" />

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <Skeleton width="60px" height="24px" />
            <Skeleton width="80px" height="32px" />
          </div>
        </div>
      ))}
    </>
  );
};

SkeletonCard.displayName = 'SkeletonCard';
