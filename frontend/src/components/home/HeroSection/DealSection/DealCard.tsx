import React from 'react'
import Image from 'next/image'
const DealCard = ({ dealProduct }: { dealProduct: Deal }) => {
    return (
        <div className="p-4 bg-white border rounded-lg text-center shadow-md hover:shadow-lg transition duration-300 w-full">
            <div className="flex justify-center">
                <Image
                    src={dealProduct.image}
                    alt={dealProduct.name}
                    width={120}
                    height={120}
                    className="rounded-md object-contain"
                />
            </div>
            <p className="mt-2 custom-font-regular text-[16px] leading-[24px] tracking-[-0.02px]">{dealProduct.name}</p>
            <span className="mt-1 bg-red-100 text-red-600 px-2 py-1 rounded-full custom-font-medium text-[14px] tracking-[-0.02px]">
                {dealProduct.discount}
            </span>
        </div>
    )
}

export default DealCard
