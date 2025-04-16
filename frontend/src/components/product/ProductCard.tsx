import { Product } from '@/interfaces/Product';
import React from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

interface ProductCardProps {
    product: Product;
    view: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, view }) => {
    return (
        <div
            className={`relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md mb-4 ${view === 'grid'
                ? 'flex flex-col w-full'
                : 'flex flex-col sm:flex-row w-full'
                }`}
        >
            {/* Product Image */}
            <div
                className={`${view === 'grid'
                    ? 'w-full h-48 sm:h-56'
                    : 'w-full sm:w-40 h-40 sm:h-32 md:h-40'
                    } overflow-hidden flex-shrink-0`}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                />
            </div>

            {/* Product Details */}
            <div
                className={`p-4 flex flex-col justify-between ${view === 'grid' ? 'w-full' : 'w-full sm:w-auto'
                    }`}
            >
                {view === 'grid' ? (
                    <>
                        {/* Price and Wishlist Icon */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {/* Wishlist Icon on the right side of the price */}
                            <FaHeart className="text-blue-500 text-lg" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`${i < Math.floor(product.rating! / 2)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                        } text-sm`}
                                />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">
                                {product.rating!.toFixed(1)}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                            {product.title}
                        </h3>
                    </>
                ) : (
                    <>
                        {/* Wishlist Icon for List View (Top Right) */}
                        <div className="absolute top-2 right-2">
                            <FaHeart className="text-blue-500 text-lg" />
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                            {product.title}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-gray-900">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Rating, Orders, and Free Shipping */}
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`${i < Math.floor(product.rating! / 2)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                            } text-sm`}
                                    />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">
                                    {product.rating!.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.orders} orders
                            </span>
                            <span className="text-sm text-green-600">Free Shipping</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {product.description}
                        </p>

                        {/* View Details Link */}
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            View details
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;