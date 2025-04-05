import React from 'react'
import Image from 'next/image';

const FooterBottom = () => {
    return (
        <div className="w-full bg-[#EFF2F4] border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
                <p>© 2023 Ecommerce.</p>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Image src="/images/usa.png" alt="US Flag" width={20} height={20} />
                    <span>English</span>
                    <span className="text-gray-500">▼</span>
                </div>
            </div>
        </div>
    )
}

export default FooterBottom
