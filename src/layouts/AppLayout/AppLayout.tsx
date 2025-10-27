/**
 * AppLayout Component
 * 
 * Main application layout with header, sidebar, footer, and content area.
 */

import { AppLayoutProps } from './AppLayout.types';
import { Header } from '@/components/molecules/Header';
import { Sidebar } from '@/components/molecules/Sidebar';
import { Footer } from '@/components/molecules/Footer';

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentPage = 'products',
  onNavigate,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {onNavigate && (
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

AppLayout.displayName = 'AppLayout';