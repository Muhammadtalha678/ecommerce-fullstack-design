import React from 'react';
import RecommendCard from './RecommendCard';

const RecommendSection = () => {
    const items = [
        { name: 'T-shirts with multiple colors, for men', price: '$10.30', image: '/images/tshirt1.jpg' },
        { name: 'Jeans shorts for men blue color', price: '$10.30', image: '/images/jeans-jacket.jpg' },
        { name: 'Brown winter coat medium size', price: '$12.50', image: '/images/coat.jpg' },
        { name: 'Jeans bag for travel', price: '$34.00', image: '/images/backpack.jpg' },
        { name: 'Leather wallet', price: '$99.00', image: '/images/wallet.jpg' },
        { name: 'Canon camera black, 100x zoom', price: '$9.99', image: '/images/deal-3.jpg' },
        { name: 'Headset for gaming with mic', price: '$8.99', image: '/images/cat21.jpg' },
        { name: 'Smartwatch silver color modern', price: '$10.30', image: '/images/cat16.jpg' },
        { name: 'Blue wallet for men leather metarfial', price: '$10.30', image: '/images/wallet.jpg' },
        { name: 'Jeans bag for travel for men', price: '$80.95', image: '/images/backpack.jpg' },
    ];

    return (
        <section className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16">
            <h1 className="text-xl md:text-2xl custom-font-semibold leading-8 tracking-tight mb-6">
                Recommended items
            </h1>

            <div className="grid max-[430px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {items.slice(0, 10).map((item, index) => (
                    <RecommendCard recommendCard={item} key={index + 1} />
                ))}
            </div>
        </section>
    );
};

export default RecommendSection;