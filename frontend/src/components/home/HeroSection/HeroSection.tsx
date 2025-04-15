'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'
export default function HeroSection() {
    const [selectedCategory, setSelectedCategory] = useState("Automobiles");
    const { user } = useAuth()
    const categories = [
        "Automobiles", "Clothes and wear", "Home interiors", "Computer and tech",
        "Tools, equipments", "Sports and outdoor", "Animal and pets",
        "Machinery tools", "More category"
    ];

    return (
        <section className="bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
            <div className="bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-lg h-full">

                {/* Left Sidebar - Categories */}
                <div className="bg-white p-6 w-full flex flex-col h-full lg:col-span-3">
                    <ul className="space-y-3 flex-grow">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <button
                                    className={`w-full text-left p-2 rounded-md ${selectedCategory === category ? 'bg-blue-100 custom-font-medium text-[16px]' : 'hover:bg-gray-200 custom-font-regular text-[16px]'}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Banner */}
                <div className="relative bg-white flex items-center p-6 overflow-hidden h-full min-h-[300px] lg:col-span-7">
                    <div className="w-2/3 z-10">
                        <h2 className="text-xl md:text-[28px] custom-font-regular">Latest trending</h2>
                        <h1 className="text-2xl md:text-[32px] custom-font-bold">Electronic items</h1>
                        <button className="mt-4 px-4 py-2 bg-white text-black rounded-md custom-font-medium text-[16px]">Learn more</button>
                    </div>

                    {/* Image Covers Entire Div */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/hero-banner.png"
                            alt="Electronics"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Right Sidebar - User & Offers */}
                <div className="space-y-5 flex flex-col h-full w-full lg:w-auto lg:col-span-2">
                    <div className="p-4 flex flex-col text-center bg-[#E3F0FF] flex-grow">
                        <p className="custom-font-regular text-[16px]">Hi, {user?.fullname}</p>
                        {
                            !user &&
                            (
                                <>
                                    <p className="custom-font-regular text-[16px]">Let’s get started</p>
                                    <button className="text-[13px] custom-font-medium mt-2 w-full bg-blue-500 text-white py-2 rounded-md">Join now</button>
                                    <button className="text-[13px] custom-font-medium mt-2 w-full border py-2 rounded-md">Log in</button>
                                </>
                            )
                        }
                    </div>
                    <div className="bg-orange-400 text-white p-4 rounded-md shadow-md">
                        <p className='custom-font-regular text-[16px]'>Get US $10 off with a new supplier</p>
                    </div>
                    <div className="bg-blue-400 text-white p-4 rounded-md shadow-md">
                        <p className='custom-font-regular text-[16px]'>Send quotes with supplier preferences</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
