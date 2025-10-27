/**
 * Sidebar component type definitions
 */

export interface SidebarProps {
  /**
   * Currently active page
   */
  currentPage: string;

  /**
   * Page navigation handler
   */
  onNavigate: (page: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Navigation item interface
 */
export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
