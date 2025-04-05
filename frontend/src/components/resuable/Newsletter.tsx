import React from 'react';
import Button from '@/components/resuable/Button';

const NewsletterSection = () => {
    return (
        <section className="bg-[#EFF2F4] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                {/* Heading */}
                <h1 className="text-[20px] custom-font-semibold leading-7 tracking-tight mb-2 sm:mb-3">
                    Subscribe on our newsletter
                </h1>
                {/* Description */}
                <p className="text-[16px] leading-6 tracking-tight custom-font-semibold text-[#606060] mb-4 sm:mb-6">
                    Get daily news on upcoming offers from many suppliers all over the world
                </p>
                {/* Form */}
                <form className="flex flex-col sm:flex-row items-center w-full max-w-md gap-2 sm:gap-3">
                    {/* Email Input */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12H8m0 0l4-4m-4 4l4 4m-5 4h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            aria-label="Email address for newsletter subscription"
                        />
                    </div>
                    {/* Subscribe Button */}
                    <Button bgColor='bg-blue-600' hoverColor='bg-blue-700' textColor='text-white' buttonText='Subscribe' />
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;