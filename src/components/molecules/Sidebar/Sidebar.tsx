/**
 * Sidebar Component
 * 
 * Application sidebar with navigation menu.
 * Responsive: Desktop = always visible, Mobile = toggleable with hamburger menu
 */

import React, { useState } from 'react';
import { Package, Info, Menu, X } from 'lucide-react';
import { SidebarProps, NavItem } from './Sidebar.types';
import { Icon } from '@/components/atoms/Icon';

const NAV_ITEMS: NavItem[] = [
  { id: 'products', label: 'Products', icon: 'package' },
  { id: 'about', label: 'About Case Study', icon: 'info' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, typeof Package> = {
      package: Package,
      info: Info,
    };
    return iconMap[iconName] || Package;
  };

  // Desktop sidebar classes
  const desktopSidebarClasses = [
    'bg-gray-900 text-white flex flex-col',
    'hidden md:flex md:w-64',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Mobile sidebar classes
  const mobileSidebarClasses = [
    'fixed inset-0 z-50 bg-gray-900 text-white flex flex-col',
    'md:hidden',
    'transform transition-transform duration-300 ease-in-out',
    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
  ]
    .filter(Boolean)
    .join(' ');

  const renderSidebarContent = () => (
    <>
      {/* Logo/Brand */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl">
              🏪
            </div>
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          
          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <Icon icon={X} size="md" decorative />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2" role="navigation" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          const IconComponent = getIconComponent(item.icon);

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon icon={IconComponent} size="md" decorative />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-3 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Icon icon={Menu} size="xs" decorative />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={mobileSidebarClasses} aria-label="Mobile navigation sidebar">
        {renderSidebarContent()}
      </aside>

      {/* Desktop Sidebar */}
      <aside className={desktopSidebarClasses} aria-label="Navigation sidebar">
        {renderSidebarContent()}
      </aside>
    </>
  );
};

Sidebar.displayName = 'Sidebar';