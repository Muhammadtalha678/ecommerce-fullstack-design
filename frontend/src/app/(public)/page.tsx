import DealsSection from '@/components/home/DealSection/DealSection'
import HeroSection from '@/components/home/HeroSection/HeroSection'
import CategorySection from '@/components/home/HomeCategories/HomeCategories';
import InquirySection from '@/components/home/InquirySection/InquirySection';
import RecommendSection from '@/components/home/RecommendSection/Recommend';
import RegionSection from '@/components/home/RegionSection/RegionSection';
import ServiceSection from '@/components/home/ServiceSection/ServiceSection';
import React from 'react'

const HomePage = () => {
    const category1_products = [
        { name: 'Soft chairs', price: 'USD 19', image: '/images/cat11.jpg' },
        { name: 'Sofa & chair', price: 'USD 19', image: '/images/cat14.jpg' },
        { name: 'Kitchen dishes', price: 'USD 19', image: '/images/cat13.jpg' },
        { name: 'Smart watches', price: 'USD 19', image: '/images/cat16.jpg' },
        { name: 'Kitchen mixer', price: 'USD 100', image: '/images/cat17.jpg' },
        { name: 'Blenders', price: 'USD 39', image: '/images/cat18.jpg' },
        { name: 'Home appliance', price: 'USD 19', image: '/images/cat15.jpg' },
        { name: 'Coffee maker', price: 'USD 10', image: '/images/cat12.jpg' },
    ];
    const category2_products = [
        { name: 'Smart watches', price: 'USD 19', image: '/images/cat16.jpg' },
        { name: 'Cameras', price: 'USD 19', image: '/images/deal-3.jpg' },
        { name: 'Headphones', price: 'USD 19', image: '/images/cat21.jpg' },
        { name: 'Smart watches', price: 'USD 19', image: '/images/cat16.jpg' },
        { name: 'Gaming set', price: 'USD 100', image: '/images/deal-2.jpg' },
        { name: 'Laptops & PC', price: 'USD 39', image: '/images/deal-4.jpg' },
        { name: 'Smartphones', price: 'USD 19', image: '/images/cat22.jpg' },
        { name: 'Electric Kattle', price: 'USD 10', image: '/images/cat23.jpg' },
    ];

    return (
        <div>
            <HeroSection />
            <DealsSection />
            <CategorySection catProds={category1_products} bannerImage="/images/category1-banner.png" bannerTitle="Home and outdoor" />
            <CategorySection catProds={category2_products} bannerImage="/images/categor2-banner.png" bannerTitle="Consumer electronics and gadgets" />
            <InquirySection />
            <RecommendSection />
            <ServiceSection />
            <RegionSection />
        </div>
    )
}

export default HomePage
