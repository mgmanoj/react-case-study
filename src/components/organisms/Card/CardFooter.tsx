/**
 * CardFooter Component
 * 
 * Footer section of the Card component.
 */

import { CardFooterProps } from './Card.types';

export function CardFooter({ children, className = '', ...rest }: CardFooterProps) {
  const footerClasses = [
    'px-6 py-4 bg-gray-50 border-t border-gray-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.displayName = 'CardFooter';
