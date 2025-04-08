import React, { useState } from 'react'
import FiltersViewToggle from './FiltersViewToggle'
import { Product } from '@/interfaces/Product'
import ProductCard from './ProductCard'

const ProductListing = ({ products }: { products: Product[] }) => {
    const [view, setView] = useState<'grid' | 'list'>('grid')
    return (
        <div className="col-span-12 lg:col-span-9 py-6">
            <FiltersViewToggle view={view} setView={setView} />
            {/* Placeholder for ProductListing */}
            <div
                className={`mt-4 ${view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2' // Reduced gap from gap-4 to gap-2
                    : 'flex flex-col gap-4'
                    }`}
            >
                {products.map((prod, ind) => (
                    <ProductCard product={prod} view={view} key={ind} />
                ))}
            </div>
        </div>
    )
}

export default ProductListing
