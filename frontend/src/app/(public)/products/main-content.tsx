'use client';
import React, { useState } from 'react';
import FiltersViewToggle from '@/components/product/FiltersViewToggle';
import Sidebar from '@/components/product/Sidebar';

const MainContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  // const [view, setView] = useState<'grid' | 'list'>('grid'); // State for view toggle
  const [view, setView] = useState<'grid' | 'list'>('grid')
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-12 gap-4">
        {/* Filter Button - only on small screens */}
        <div className="col-span-6 lg:hidden">
          <button
            className="px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="font-medium text-lg sm:text-xl">Filter Products</span>
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Product Listing Section */}
        <div className="col-span-12 lg:col-span-9 py-6">
          <FiltersViewToggle view={view} setView={setView} />
          {/* Placeholder for ProductListing */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;