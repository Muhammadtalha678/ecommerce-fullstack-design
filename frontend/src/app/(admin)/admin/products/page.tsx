'use client'

import React from 'react'

import Link from 'next/link'
import ProductTable from '@/components/Admin/ProductTable'


const AdminProducts = () => {
    // Dummy data (replace with real data later)
    const products = [
        {
            id: "1",
            name: 'Nike Air Max',
            price: "120",
            image: '/shoes1.jpg',
            category: "Electronics"
        },
        {
            id: "2",
            name: 'Adidas UltraBoost',
            price: "140",
            image: '/shoes2.jpg',
            category: "Shoes"
        },
    ]

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <Link
                    href="/admin/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </Link>
            </div>

            <div className="overflow-x-auto">
                <ProductTable products={products} />
            </div>

            {/* Pagination */}
            {/* <div className="mt-6 flex justify-center space-x-2">
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">2</button>
                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
            </div> */}
        </div>
    )
}

export default AdminProducts
