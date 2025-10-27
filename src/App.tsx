/**
 * App Component
 * 
 * Main application component with routing logic.
 */

import React, { useState } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Products } from '@/pages/Products';
import { About } from '@/pages/About';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('products');

  return (
    <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'products' && <Products />}
      {currentPage === 'about' && <About />}
    </AppLayout>
  );
};

export default App;
