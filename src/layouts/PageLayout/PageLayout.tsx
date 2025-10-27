/**
 * PageLayout Component
 * 
 * Standard page container with title, description, and consistent spacing.
 */

import { PageLayoutProps } from './PageLayout.types';

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  className = '',
}) => {
  const containerClasses = ['p-6', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Page Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          )}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      {/* Page Content */}
      {children}
    </div>
  );
};

PageLayout.displayName = 'PageLayout';
