/**
 * Header Component
 * 
 * Application header with branding and user actions.
 */

import { Bell } from 'lucide-react';
import { HeaderProps } from './Header.types';
import { Icon } from '@/components/atoms/Icon';

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const headerClasses = [
    'bg-white border-b border-gray-200 sticky top-0 z-10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClasses}>
      <div className="px-6 py-4 md:px-6 pl-16 md:pl-6">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <h1 className="text-2xl font-bold text-gray-900">ProductsUp</h1>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Button */}
            <button
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Notifications"
            >
              <Icon icon={Bell} size="md" decorative />
            </button>

            {/* User Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
              role="button"
              tabIndex={0}
              aria-label="User menu"
            >
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';