/**
 * CardActions Component
 * 
 * Actions section for buttons or other interactive elements.
 */

import { CardActionsProps } from './Card.types';

const ALIGNMENT_CLASSES = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

export function CardActions({ children, className = '', align = 'end', ...rest }: CardActionsProps) {
  const actionsClasses = [
    'flex items-center gap-2',
    ALIGNMENT_CLASSES[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={actionsClasses} {...rest}>
      {children}
    </div>
  );
}

CardActions.displayName = 'CardActions';
