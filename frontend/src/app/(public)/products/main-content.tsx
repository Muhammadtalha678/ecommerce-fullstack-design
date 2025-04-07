'use client'
import Sidebar from '@/components/product/Sidebar'
import React, { useState } from 'react';

const MainContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-12 gap-4 ">
        {/* Filter Button - only on small screens */}
        <div className="col-span-6 lg:hidden">
          <button
            className="px-1  py-2 text-sm bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition  btn btn-outline-dark rounded-0 hover:cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <span className='custom-font-medium max-[360]:text-[14px] sm:text-xl text-lg'>Filter Products</span>
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Product Listing */}
        <div className="bg-amber-300 mb-4 col-span-12 lg:col-span-9 grid items-center p-2">

          <p className="text-sm">Sidebar filters here</p>
        </div>
      </div>
    </div>
  )
}

export default MainContent
