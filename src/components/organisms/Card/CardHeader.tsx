/**
 * CardHeader Component
 * 
 * Header section of the Card component.
 */

import { CardHeaderProps } from './Card.types';

export function CardHeader({ children, className = '', ...rest }: CardHeaderProps) {
  const headerClasses = [
    'px-6 py-4 border-b border-gray-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={headerClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.displayName = 'CardHeader';
