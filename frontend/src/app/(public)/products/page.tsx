import Breadcrumbs from '@/components/product/Breadcrumb';
import MainContent from './main-content';

// Define the type for breadcrumb items
interface BreadcrumbItem {
    label: string;
    href: string;
}

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
            <div className="">
                <Breadcrumbs paths={breadcrumbs} />
            </div>
            {/* Main Content */}
            <MainContent />


        </div>
    );
};

export default ProductPage;