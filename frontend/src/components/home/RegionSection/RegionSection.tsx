import React from 'react';
import Image from 'next/image';

const RegionSection = () => {
    const suppliers = [
        { country: 'Arabic Emirates', domain: 'shopname.ae', flag: '/images/flags/dubai.png' },
        { country: 'Australia', domain: 'shopname.ae', flag: '/images/flags/australia.png' },
        { country: 'United States', domain: 'shopname.ae', flag: '/images/flags/usa.png' },
        { country: 'Russia', domain: 'shopname.ru', flag: '/images/flags/russia.png' },
        { country: 'Italy', domain: 'shopname.it', flag: '/images/flags/itlay.png' },
        { country: 'Denmark', domain: 'denmark.com.dk', flag: '/images/flags/scotland.png' },
        { country: 'France', domain: 'shopname.com.fr', flag: '/images/flags/france.png' },
        { country: 'Arabic Emirates', domain: 'shopname.ae', flag: '/images/flags/dubai.png' },
        { country: 'China', domain: 'shopname.ae', flag: '/images/flags/china.png' },
        { country: 'Great Britain', domain: 'shopname.co.uk', flag: '/images/flags/england.png' },
    ];

    return (
        <section className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-6">
                Suppliers by region
            </h1>

            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 justify-items-center">
                {suppliers.map((supplier, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center space-y-1 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3 sm:text-left"
                        aria-label={`Supplier from ${supplier.country}`}
                    >
                        {/* Flag */}
                        <div className="w-6 h-4 sm:w-8 sm:h-6 md:w-10 md:h-8">
                            <Image
                                src={supplier.flag}
                                alt={`${supplier.country} flag`}
                                width={40}
                                height={32}
                                className="object-cover rounded-sm"
                            />
                        </div>
                        {/* Country and Domain (Hidden on small screens) */}
                        <div className="hidden sm:flex sm:flex-col">
                            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                                {supplier.country}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                {supplier.domain}
                            </p>
                        </div>
                        {/* Country Name (Visible on small screens) */}
                        <p className="sm:hidden text-xs font-medium text-gray-900">
                            {supplier.country}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RegionSection;