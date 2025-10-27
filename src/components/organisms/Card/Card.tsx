/**
 * Card Component
 * 
 * A flexible container component with compound pattern support.
 * Composed with CardHeader, CardContent, CardFooter sub-components.
 * 
 * @example
 * ```tsx
 * <Card hoverable>
 *   <Card.Header>Title</Card.Header>
 *   <Card.Content>Content here</Card.Content>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 * ```
 */

import { CardProps } from './Card.types';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardActions } from './CardActions';

function CardComponent({ children, className = '', hoverable = false, clickable = false, ...rest }: CardProps) {
  const cardClasses = [
    'bg-white rounded-lg shadow overflow-hidden',
    hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : '',
    clickable ? 'cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

CardComponent.displayName = 'Card';

/**
 * Card with compound components
 */
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
});
