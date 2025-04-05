import React from 'react';
import Image from 'next/image';

const RecommendCard = ({ recommendCard }: { recommendCard: { image: string, name: string, price: string } }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col">
            <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52">
                <Image
                    src={recommendCard.image}
                    alt={recommendCard.name}
                    layout="fill"
                    objectFit="contain"
                    quality={100} // Improves sharpness
                />
            </div>
            <p className="text-[16px] custom-font-medium leading-[22px] text-[#1C1C1C] mt-3 sm:mt-4 text-left">
                {recommendCard.price}
            </p>
            <p className="custom-font-regular text-[13px] text-[#8B96A5] mt-1 text-left">
                {recommendCard.name}
            </p>
        </div>
    );
};

export default RecommendCard;
