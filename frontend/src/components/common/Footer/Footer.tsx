import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import FooterBottom from './FooterBottom';
import { FooterLinks } from '@/lib/footerLinks';

const socialIcons = [
    { Icon: FaFacebookF, href: '#', alt: 'Facebook' },
    { Icon: FaTwitter, href: '#', alt: 'Twitter' },
    { Icon: FaLinkedinIn, href: '#', alt: 'LinkedIn' },
    { Icon: FaInstagram, href: '#', alt: 'Instagram' },
    { Icon: FaYoutube, href: '#', alt: 'YouTube' },
];

const appButtons = [
    { src: '/images/apple.png', alt: 'App Store', href: '/apple' },
    { src: '/images/google.png', alt: 'Google Play', href: '/google' },
];

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200">
            {/* Top Section */}
            <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 text-center sm:text-left">
                        {/* Brand Section */}
                        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 flex flex-col items-center sm:items-start">
                            <div className="flex items-center space-x-2 mb-4">
                                <Image
                                    alt="logo"
                                    src="/images/logo.png"
                                    width={100}
                                    height={100}
                                    className="w-full h-[40px]" // Fixes the size across all screen sizes
                                />
                                {/* <h3 className="text-xl font-bold ml-2text-[#8CB7F5]">Brand</h3> */}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xs">
                                Best information about the company goes here but now lorem ipsum.
                            </p>
                            <div className="flex space-x-3 justify-center sm:justify-start">
                                {socialIcons.map(({ Icon, href, alt }, index) => (
                                    <Link
                                        key={index}
                                        href={href}
                                        aria-label={alt}
                                        className="text-gray-500 hover:text-blue-500 text-lg transition-colors duration-300"
                                    >
                                        <Icon />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {FooterLinks.map((section, idx) => (
                            <div key={idx} className="col-span-1 flex flex-col items-center sm:items-start">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                href={`/${section.title.toLowerCase().replace(' ', '-')}/${link.toLowerCase().replace(' ', '-')}`}
                                                className="hover:text-blue-500 transition-colors duration-300"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* App Buttons */}
                        <div className="col-span-1 flex flex-col items-center sm:items-start">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get app</h3>
                            <div className="space-y-3">
                                {appButtons.map((button, index) => (
                                    <Link key={index} href={button.href}>
                                        <Image
                                            src={button.src}
                                            alt={button.alt}
                                            width={130}
                                            height={40}
                                            className="bg-white rounded shadow hover:shadow-md transition-shadow duration-300"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <FooterBottom />
        </footer>
    );
};

export default Footer;