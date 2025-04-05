import Image from 'next/image';
import CategoryProductCard from './CategoryProductCard';
import Button from '@/components/resuable/Button';
import { CatProd } from '@/interfaces/CatProd';

const CategorySection = ({ catProds, bannerImage, bannerTitle }: {
    catProds: CatProd[], bannerImage: string,
    bannerTitle: string
}) => {
    console.log(bannerImage);

    return (
        <section className="bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
            <div className="bg-white p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch rounded-lg">

                {/* Left Banner Section (Same Height as Product Grid) */}
                <div className="lg:col-span-3 bg-gray-100 p-6 rounded-lg flex flex-col justify-center items-start relative overflow-hidden min-h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={bannerImage}
                            alt="Home and outdoor"
                            layout="fill"
                            // objectFit="cover"
                            objectPosition="center"
                            className="rounded-lg"
                        />
                    </div>
                    {/* Overlay Content */}
                    <div className="relative z-10 min-[1024px]:bottom-20 min-[1024px]:mt-7">
                        <h2 className="text-[20px] leading-[26px] custom-font-semibold text-black">{bannerTitle}</h2>
                        <Button bgColor='bg-white' buttonText='Source Now' hoverColor='bg-gray-100' textColor='text-black' />
                    </div>
                </div>

                {/* Right Product Grid */}
                <div className="lg:col-span-9 max-[430px]:grid-cols-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {catProds.map((product, index) => (
                        <CategoryProductCard catProduct={product} key={index + 1} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default CategorySection