/**
 * Select Component
 * 
 * A reusable select dropdown with label, error states, and accessibility.
 */

import { SelectProps } from './Select.types';

export function Select({
  name,
  label,
  value,
  options,
  onChange,
  disabled = false,
  placeholder,
  className = '',
  showLabel = true,
}: SelectProps) {
  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  // Generate unique ID for accessibility
  const id = `select-${name}`;

  // Select classes
  const selectClasses = [
    'w-full px-1 py-2 border rounded-lg transition-colors',
    'focus:outline-none focus:ring-2',
    disabled
      ? 'bg-gray-100 cursor-not-allowed text-gray-500'
      : 'bg-white hover:border-gray-400',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full">
      {/* Label */}
      {showLabel && (
        <label
          htmlFor={id}
          className="block text-sm text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      {/* Select Input */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={selectClasses}
        aria-label={showLabel ? undefined : label}
      >
        {/* Placeholder option */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.displayName = 'Select';
