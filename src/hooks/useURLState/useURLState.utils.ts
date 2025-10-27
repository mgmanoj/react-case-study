/**
 * useURLState utility functions
 */

/**
 * Get URL search params
 * @returns URLSearchParams object
 */
export const getSearchParams = (): URLSearchParams => {
  if (typeof window === 'undefined') {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
};

/**
 * Update URL without page reload
 * @param params - URLSearchParams to set
 */
export const updateURL = (params: URLSearchParams): void => {
  if (typeof window === 'undefined') return;

  const newURL = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.pushState({}, '', newURL);
};

/**
 * Parse value from URL string
 * @param urlValue - String from URL
 * @param defaultValue - Default value for type inference
 * @returns Parsed value
 */
export const parseURLValue = <T>(urlValue: string | null, defaultValue: T): T => {
  if (urlValue === null) {
    return defaultValue;
  }

  // Handle different types
  if (typeof defaultValue === 'number') {
    const num = Number(urlValue);
    return (isNaN(num) ? defaultValue : num) as T;
  }

  if (typeof defaultValue === 'boolean') {
    return (urlValue === 'true') as T;
  }

  // String or other types
  return urlValue as T;
};

/**
 * Serialize value for URL
 * @param value - Value to serialize
 * @returns String representation
 */
export const serializeURLValue = <T>(value: T): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
};
