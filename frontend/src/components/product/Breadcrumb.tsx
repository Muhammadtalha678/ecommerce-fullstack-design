'use client';
import React from 'react';
import Link from 'next/link';

// Define the type for each breadcrumb item
interface BreadcrumbItem {
    label: string;
    href: string;
}

// Define the props for the Breadcrumbs component
interface BreadcrumbsProps {
    paths: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
    return (
        <nav className="flex items-center text-sm text-gray-500 py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24  bg-white max-[412px]:text-[12px]">
            {paths.map((path, index) => (
                <div key={index} className="flex items-center">
                    {index < paths.length - 1 ? (
                        <>
                            <Link href={path.href} className="hover:text-blue-500">
                                {path.label}
                            </Link>
                            <span className="max-[400px]:mx-1 mx-2">{">"}</span>
                        </>
                    ) : (
                        <span className="text-gray-800">{path.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;