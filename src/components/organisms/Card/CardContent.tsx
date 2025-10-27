/**
 * CardContent Component
 * 
 * Content section of the Card component.
 */

import { CardContentProps } from './Card.types';

export function CardContent({ children, className = '', ...rest }: CardContentProps) {
  const contentClasses = ['px-6 py-4', className].filter(Boolean).join(' ');

  return (
    <div className={contentClasses} {...rest}>
      {children}
    </div>
  );
}

CardContent.displayName = 'CardContent';
