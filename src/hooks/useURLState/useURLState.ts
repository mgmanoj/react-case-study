/**
 * useURLState Hook
 * 
 * Hook for syncing state with URL query parameters.
 * Allows shareable URLs with preserved state.
 * 
 * @example
 * ```tsx
 * const { value: page, setValue: setPage } = useURLState('page', 1);
 * const { value: sort, setValue: setSort } = useURLState('sort', 'name');
 * 
 * // URL will be: ?page=2&sort=price
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { UseURLStateReturn } from './useURLState.types';
import {
  getSearchParams,
  updateURL,
  parseURLValue,
  serializeURLValue,
} from './useURLState.utils';

export function useURLState<T extends string | number | boolean>(
  key: string,
  defaultValue: T
): UseURLStateReturn<T> {
  // Get initial value from URL or use default
  const getInitialValue = (): T => {
    const params = getSearchParams();
    const urlValue = params.get(key);
    return parseURLValue(urlValue, defaultValue);
  };

  const [value, setValueState] = useState<T>(getInitialValue);

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const newValue = getInitialValue();
      setValueState(newValue);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [key, defaultValue]);

  /**
   * Set value and update URL
   */
  const setValue = useCallback(
    (newValue: T) => {
      setValueState(newValue);

      // Update URL
      const params = getSearchParams();

      if (newValue === defaultValue) {
        // Remove param if it's the default value
        params.delete(key);
      } else {
        params.set(key, serializeURLValue(newValue));
      }

      updateURL(params);
    },
    [key, defaultValue]
  );

  /**
   * Clear value from URL (revert to default)
   */
  const clearValue = useCallback(() => {
    setValueState(defaultValue);

    const params = getSearchParams();
    params.delete(key);
    updateURL(params);
  }, [key, defaultValue]);

  return {
    value,
    setValue,
    clearValue,
  };
}
