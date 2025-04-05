'use client';
import React from 'react';
import Image from 'next/image';

const FooterBottom = () => {
    return (
        <div className="w-full bg-[#EFF2F4] border-t border-gray-200">
            <div className=" px-4 py-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 flex flex-col sm:flex-row justify-between items-center text-[#606060] custom-font-regular text-[16px] leading-6 tracking-tight">
                <p>© 2023 Ecommerce.</p>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Image src="/images/usa.png" alt="US Flag" width={20} height={20} />
                    <span className='text-[#606060] custom-font-regular text-[16px] leading-6 tracking-tight'>English</span>
                    <span className="text-gray-500">▼</span>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;