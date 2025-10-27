/**
 * Card component type definitions
 */

import { HTMLAttributes, ReactNode } from 'react';

/**
 * Base Card props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the card has hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Whether the card is clickable
   * @default false
   */
  clickable?: boolean;
}

/**
 * Card Header props
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Header content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card Content props
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card Footer props
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Card Actions props
 */
export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Action buttons or content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Alignment of actions
   * @default 'end'
   */
  align?: 'start' | 'center' | 'end' | 'between';
}
