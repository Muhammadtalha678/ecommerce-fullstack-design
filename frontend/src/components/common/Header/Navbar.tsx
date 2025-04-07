"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { navbarLinks } from "@/lib/navbarLinks";

const TopNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // for change the flag
    const [countryFlag, setCountryFlag] = useState<string>('DE')
    return (
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-3">
            <div className="flex justify-between items-center">
                {/* Left Section - Hamburger & Categories */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-700 text-xl"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-6 text-gray-700 text-sm">
                        <button className="flex items-center hover:text-blue-500 custom-font-medium text-[16px]">
                            <FaBars className="mr-2" /> All category
                        </button>
                        {
                            navbarLinks.map((nav, index) => {
                                return <Link key={index + 1} href="#" className="hover:text-blue-500 custom-font-medium text-[16px] leading-[22px]">
                                    {nav.name}
                                </Link>
                            })
                        }

                        <select className="bg-transparent focus:outline-none cursor-pointer custom-font-medium text-[16px]">
                            <option>Help</option>
                            <option>FAQ</option>
                            <option>Contact Us</option>
                        </select>
                    </div>
                </div>

                {/* Right Section - Language & Shipping */}
                <div className="hidden lg:flex items-center gap-4 text-gray-700 text-sm">
                    <select className="bg-transparent focus:outline-none cursor-pointer custom-font-medium text-[16px] leading-[22px]">
                        <option>English, USD</option>
                        <option>Spanish, EUR</option>
                        <option>French, EUR</option>
                    </select>
                    <div className="flex items-center gap-1 custom-font-medium text-[16px] leading-[22px]">
                        <span>Ship to</span>
                        <ReactCountryFlag
                            countryCode={countryFlag}
                            svg
                            style={{ width: '20px', height: '15px' }}
                            title={countryFlag}
                        />
                        <select className="bg-transparent focus:outline-none cursor-pointer "
                            onChange={(e) => setCountryFlag(e.target.value)}
                            value={countryFlag}
                        >
                            <option value="DE">Germany</option>
                            <option value="US">USA</option>
                            <option value="FR">France</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden mt-3 flex flex-col bg-white shadow-md p-4 space-y-2 text-gray-700">
                        <button className="flex items-center">
                            <FaBars className="mr-2" /> All category
                        </button>
                        <a href="#" className="hover:text-blue-500">
                            Hot offers
                        </a>
                        <a href="#" className="hover:text-blue-500">
                            Gift boxes
                        </a>
                        <a href="#" className="hover:text-blue-500">
                            Projects
                        </a>
                        <a href="#" className="hover:text-blue-500">
                            Menu item
                        </a>
                        <select className="bg-transparent focus:outline-none">
                            <option>Help</option>
                            <option>FAQ</option>
                            <option>Contact Us</option>
                        </select>
                        <select className="bg-transparent focus:outline-none mt-2">
                            <option>English, USD</option>
                            <option>Spanish, EUR</option>
                            <option>French, EUR</option>
                        </select>
                        <div className="flex items-center mt-2">
                            <span>Ship to</span>
                            <ReactCountryFlag
                                countryCode={countryFlag}
                                svg
                                style={{ width: '20px', height: '15px' }}
                                title={countryFlag}
                            />

                            <select className="bg-transparent focus:outline-none"
                                value={countryFlag}
                                onChange={(e) => setCountryFlag(e.target.value)}>
                                <option value="DE">Germany</option>
                                <option value="US">USA</option>
                                <option value="FR">France</option>
                            </select>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default TopNav;
