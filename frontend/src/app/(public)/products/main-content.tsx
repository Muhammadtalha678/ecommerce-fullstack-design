'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/product/Sidebar';
import ProductListing from '@/components/product/ProductListing';
import { Product } from '@/interfaces/Product';

const MainContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const products: Product[] = [
    {
      id: 1,
      title: 'Canon Cmera EOS 2000, Black 10x zoom',
      image: '/images/deal-1.jpg',
      rating: 4,
      orders: 8112800,
      price: 998.00,
      originalPrice: 1128.00,
      shipping: 'Free Shipping',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      title: 'GoPro HERO6 4K Action Camera - Black',
      image: '/images/deal-2.jpg',
      rating: 4,
      orders: 154,
      price: 998.00,
      shipping: 'Free Shipping',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 3,
      title: 'GoPro HERO6 4K Action Camera - Black',
      image: '/images/deal-3.jpg',
      rating: 4,
      orders: 154,
      price: 998.00,
      shipping: 'Free Shipping',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 4,
      title: 'GoPro HERO6 4K Action Camera - Black',
      image: '/images/deal-4.jpg',
      rating: 4,
      orders: 154,
      price: 998.00,
      shipping: 'Free Shipping',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 5,
      title: 'GoPro HERO6 4K Action Camera - Black',
      image: '/images/cat16.jpg',
      rating: 4,
      orders: 154,
      price: 998.00,
      originalPrice: 1128.00,
      shipping: 'Free Shipping',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 6,
      title: 'GoPro HERO6 4K Action Camera - Black',
      image: '/images/cat21.jpg',
      rating: 4,
      orders: 154,
      price: 998.00,
      shipping: 'Free Shipping',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
  ];
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-12 gap-4">
        {/* Filter Button - only on small screens */}
        <div className="col-span-6 lg:hidden mt-2">
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
        <ProductListing products={products} />
      </div>
    </div>
  );
};

export default MainContent;