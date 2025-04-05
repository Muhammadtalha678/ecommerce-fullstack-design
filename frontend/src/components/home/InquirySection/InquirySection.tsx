import Image from 'next/image';
import Button from '@/components/resuable/Button';

export default function InquirySection() {
    return (
        <section className='bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8'>

            <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg min-h-[400px] overflow-hidden relative p-7">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/images/inquiry-background.png"
                        alt="Warehouse background"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    // className="opacity-30 brightness-75"
                    />
                </div>

                {/* Left Text Section */}
                <div className="relative z-10 max-w-lg text-white p-6  lg:w-1/2 text-center lg:text-left min-[1024px]:bottom-28">
                    <h2 className="text-3xl custom-font-semibold">An easy way to send requests to all suppliers</h2>
                    <p className="mt-3 text-gray-200 custom-font-regular text-[16px] leading-[24px] tracking-[-0.2px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                    </p>
                </div>

                {/* Right Form Section */}
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-none lg:w-2/5 mx-auto lg:mx-0">
                    <h3 className="text-lg custom-font-semibold text-[20px] leading-[28px] tracking-[-0.2px]">Send quote to suppliers</h3>
                    <form className="mt-4 space-y-4">
                        <input
                            type="text"
                            placeholder="What item you need?"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 custom-font-regular text-[16px]"
                        />
                        <textarea
                            placeholder="Type more details"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 custom-font-regular text-[16px]"
                        ></textarea>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 custom-font-regular text-[16px]"
                            />
                            <select className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 custom-font-regular text-[16px]">
                                <option>Pcs</option>
                                <option>Kg</option>
                                <option>Liters</option>
                            </select>
                        </div>
                        <Button bgColor='bg-blue-600' buttonText='Send inquiry' hoverColor='bg-blue-700' textColor='text-white' />
                    </form>
                </div>
            </div>

        </section>
    );
}
