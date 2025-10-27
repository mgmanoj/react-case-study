/**
 * Focus management utilities
 */

/**
 * Set focus to an element
 * @param element - The element to focus
 */
export const setFocus = (element: HTMLElement | null): void => {
  if (element) {
    element.focus();
  }
};

/**
 * Get all focusable elements within a container
 * @param container - The container element
 * @returns Array of focusable elements
 */
export const getFocusableElements = (
  container: HTMLElement
): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
};

/**
 * Trap focus within a container
 * @param container - The container element
 * @param event - The keyboard event
 */
export const trapFocus = (
  container: HTMLElement,
  event: KeyboardEvent
): void => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (!firstElement || !lastElement) return;

  // Tab key
  if (event.key === 'Tab') {
    // Shift + Tab (backward)
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
};

/**
 * Restore focus to a previously focused element
 * @param element - The element to restore focus to
 */
export const restoreFocus = (element: HTMLElement | null): void => {
  if (element && document.contains(element)) {
    setTimeout(() => {
      element.focus();
    }, 0);
  }
};
