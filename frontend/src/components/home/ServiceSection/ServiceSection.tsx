import React from 'react';
import Image from 'next/image';
import { FaSearch, FaPencilRuler, FaShippingFast, FaShieldAlt } from 'react-icons/fa';

const services = [
    {
        title: 'Source from Industry Hubs',
        icon: <FaSearch className="text-blue-600 text-xl" />,
        image: '/images/service4.png',
    },
    {
        title: 'Customize Your Products',
        icon: <FaPencilRuler className="text-blue-600 text-xl" />,
        image: '/images/service1.png',
    },
    {
        title: 'Fast, reliable shipping by ocean or air',
        icon: <FaShippingFast className="text-blue-600 text-xl" />,
        image: '/images/service2.png',
    },
    {
        title: 'Product monitoring and inspection',
        icon: <FaShieldAlt className="text-blue-600 text-xl" />,
        image: '/images/service3.png',
    },
];

const ServiceSection = () => {
    return (
        <section className="bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
            <h2 className="text-xl md:text-2xl custom-font-semibold leading-8 tracking-tight mb-6">Our extra services</h2>

            <div className="grid max-[430px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Image Section */}
                        <div className="relative w-full h-40">
                            <Image
                                src={service.image}
                                alt={service.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                            {/* Blackish Overlay Effect */}
                            <div className="absolute inset-0 bg-black opacity-30"></div>

                            {/* Icon Overlay */}
                            <div className="absolute bottom-[-18px] right-4 bg-white rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10">
                                {service.icon}
                            </div>
                        </div>


                        {/* Text Section */}
                        <div className="p-4">
                            <p className="text-[16px] leading-[22px] custom-font-medium text-[#1C1C1C]">{service.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceSection;
