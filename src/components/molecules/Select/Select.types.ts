/**
 * Select component type definitions
 */

export interface SelectOption {
  /**
   * Option value
   */
  value: string;

  /**
   * Option display label
   */
  label: string;

}

export interface SelectProps {
  /**
   * Select input name
   */
  name: string;

  /**
   * Label text
   */
  label: string;

  /**
   * Current value
   */
  value: string;

  /**
   * Available options
   */
  options: SelectOption[];

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Whether the select is disabled
   */
  disabled?: boolean;

  /**
   * Placeholder text (for empty option)
   */
  placeholder?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to show label
   */
  showLabel?: boolean;
}
