import React from 'react'
import Image from 'next/image'
const CategoryProductCard = ({ catProduct }: { catProduct: CatProd }) => {
    return (
        <div className="bg-white p-5 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between relative h-36">

            {/* Text Content (Top Left) */}
            <div className='custom-font-regular'>
                <p className="text-[16px] text-[#1C1C1C]">{catProduct.name}</p>
                <span className="text[#8B96A5] text-[13px] block">From</span>
                <span className="text[#8B96A5] text-[13px]">{catProduct.price}</span>
            </div>

            {/* Product Image (Bottom Right) */}
            <div className="absolute bottom-2 right-2 w-16 h-16">
                <Image src={catProduct.image} alt={catProduct.name} width={64} height={64} objectFit="contain" />
            </div>

        </div>
    )
}

export default CategoryProductCard
