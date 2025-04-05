'use client';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image'
import Search from './Search';
import { topNavLink } from '@/lib/topNavLinks';
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 p-4  md:p-3 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            {/* Main Container - Keeps everything aligned */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">

                {/* Left Side - Logo & Hamburger */}
                <div className="flex items-center justify-between w-full lg:w-auto">
                    {/* Logo */}

                    <div className="flex items-center">
                        {/* Fixed Size Logo */}
                        <Image
                            alt="logo"
                            src="/images/logo.png"
                            width={80}
                            height={80}
                            className="w-full h-[40px]" // Fixes the size across all screen sizes
                        />

                        {/* Brand Name */}
                        {/* <h1 className="text-blue-600 text-xl font-bold ml-2">Brand</h1> */}
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button
                        className="lg:hidden text-gray-600 text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Center - Search Bar (Moves down on small screens) */}
                <Search />

                {/* Right Side - Icons (Hidden on small screens) */}
                <div className="hidden lg:flex gap-4 text-gray-600">
                    {
                        topNavLink.map((nav, i: number) => {
                            return <div key={i + 1} className="flex flex-col items-center gap-1">
                                <nav.icons color='#8B96A5' />
                                <span className="custom-font-regular text-[12px] text-[#8B96A5]">{nav.name}</span>
                            </div>
                        })
                    }



                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center p-4 lg:hidden">
                    {
                        topNavLink.map((nav, index) => {
                            return <div key={index + 1} className="flex items-center gap-2 mt-2">
                                <nav.icons color='#8B96A5' />
                                <span className='custom-font-regular text-[12px] text-[#8B96A5]'>{nav.name}</span>
                            </div>
                        })
                    }
                </div>
            )}
        </header>
    );
}
