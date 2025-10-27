/**
 * SkeletonText Component
 * 
 * Skeleton for text content with multiple lines.
 * 
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * ```
 */

import { Skeleton } from './Skeleton';

interface SkeletonTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;

  /**
   * Line height in pixels
   * @default 20
   */
  lineHeight?: number;

  /**
   * Spacing between lines in pixels
   * @default 8
   */
  spacing?: number;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = 20,
  spacing = 8,
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? '80%' : '100%'}
          height={lineHeight}
          style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
        />
      ))}
    </div>
  );
};

SkeletonText.displayName = 'SkeletonText';
