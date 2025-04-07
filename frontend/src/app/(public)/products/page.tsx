import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaHeart, FaShoppingBag, FaCaretDown, FaTimes } from 'react-icons/fa';
import Breadcrumbs from '@/components/product/Breadcrumb';
import ProductListing from '@/components/product/ProductListing';
import ProductCard from '@/components/product/ProductCard';
import Sidebar from '@/components/product/Sidebar';
import MainContent from './main-content';

// Define the type for breadcrumb items
interface BreadcrumbItem {
    label: string;
    href: string;
}

interface Product {
    id: number;
    title: string;
    image: string;
    rating: number;
    orders: number;
    price: string;
    originalPrice?: string;
    shipping: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        title: 'Canon Cmera EOS 2000, Black 10x zoom',
        image: '/images/product1.png',
        rating: 4,
        orders: 8112800,
        price: '$998.00',
        originalPrice: '$1128.00',
        shipping: 'Free Shipping',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 2,
        title: 'GoPro HERO6 4K Action Camera - Black',
        image: '/images/product2.png',
        rating: 4,
        orders: 154,
        price: '$998.00',
        shipping: 'Free Shipping',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
        id: 3,
        title: 'GoPro HERO6 4K Action Camera - Black',
        image: '/images/product3.png',
        rating: 4,
        orders: 154,
        price: '$998.00',
        shipping: 'Free Shipping',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
        id: 4,
        title: 'GoPro HERO6 4K Action Camera - Black',
        image: '/images/product4.png',
        rating: 4,
        orders: 154,
        price: '$998.00',
        shipping: 'Free Shipping',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
        id: 5,
        title: 'GoPro HERO6 4K Action Camera - Black',
        image: '/images/product5.png',
        rating: 4,
        orders: 154,
        price: '$998.00',
        originalPrice: '$1128.00',
        shipping: 'Free Shipping',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
        id: 6,
        title: 'GoPro HERO6 4K Action Camera - Black',
        image: '/images/product6.png',
        rating: 4,
        orders: 154,
        price: '$998.00',
        shipping: 'Free Shipping',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
];
const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Clothing', href: '/clothing' },
    { label: "Men's wear", href: '/clothing/mens-wear' },
    { label: 'Summer clothing', href: '/clothing/mens-wear/summer-clothing' },
];

const ProductPage = () => {
    return (
        <div className="min-h-screen bg-[#F5F7FA]">

            {/* Breadcrumbs */}
            <div className="mb-4">
                <Breadcrumbs paths={breadcrumbs} />
            </div>
            {/* Main Content */}
            <MainContent />


        </div>
    );
};

export default ProductPage;