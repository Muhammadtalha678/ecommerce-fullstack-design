'use client'
import { SidebarSection } from '@/interfaces/Sidebar'
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'
const RenderSidebarContent = ({ sidebarContent }: { sidebarContent: SidebarSection[] }) => {
    const [openSection, setopenSection] = useState({
        category: true,
        brands: true,
        features: true,
        price: true,
        condition: true,
        ratings: true,
    })
    return (
        sidebarContent.map((item, index) => (
            <div key={index} className="">
                {/* category section */}
                {
                    item.categories && (
                        <>
                            <hr className="  border-gray-200 mb-3" />
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold capitalize">Category</p>
                                {
                                    openSection.category
                                        ?
                                        <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, category: false })} />
                                        :
                                        <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, category: true })} />
                                }
                            </div>

                            {/* Content based on key */}
                            <div className={`space-y-4 ${openSection.category ? 'flex-col' : 'hidden'}`}>
                                {
                                    item.categories.map((cat, ind) => (

                                        <p className="text-sm text-gray-700 hover:cursor-pointer" key={ind}>
                                            {cat}
                                        </p>
                                    ))
                                }
                                <button className="text-blue-500 text-sm font-medium hover:cursor-pointer">See all</button>
                            </div>
                        </>
                    )
                }
                {/* brands section */}
                {
                    item.brands && (
                        <>
                            <hr className="  border-gray-200 mb-3" />
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold capitalize">Brands</p>
                                {
                                    openSection.brands
                                        ?
                                        <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, brands: false })} />
                                        :
                                        <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, brands: true })} />
                                }
                            </div>

                            {/* Content based on key */}
                            <div className={`space-y-4 ${openSection.brands ? 'flex-col' : 'hidden'}`}>
                                {
                                    item.brands.map((brand, ind) => (

                                        <label key={ind} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="checkbox"
                                                className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded hover:cursor-pointer" />
                                            {brand}
                                        </label>
                                    ))
                                }
                                <button className="text-blue-500 text-sm font-medium hover:cursor-pointer">See all</button>
                            </div>
                        </>
                    )
                }
                {/* features section */}
                {
                    item.features && (
                        <>
                            <hr className="  border-gray-200 mb-3" />
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold capitalize">Features</p>
                                {
                                    openSection.features
                                        ?
                                        <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, features: false })} />
                                        :
                                        <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, features: true })} />
                                }
                            </div>

                            {/* Content based on key */}
                            <div className={`space-y-4 ${openSection.features ? 'flex-col' : 'hidden'}`}>
                                {
                                    item.features.map((feature, ind) => (

                                        <label key={ind} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="checkbox"
                                                className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded hover:cursor-pointer" />
                                            {feature}
                                        </label>
                                    ))
                                }
                                <button className="text-blue-500 text-sm font-medium hover:cursor-pointer">See all</button>
                            </div>
                        </>
                    )
                }
                {/* price section */}
                {item.price && (
                    <>
                        <hr className="  border-gray-200 mb-3" />
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold capitalize">Prices</p>
                            {
                                openSection.price
                                    ?
                                    <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, price: false })} />
                                    :
                                    <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, price: true })} />
                            }
                        </div>
                        <div className={`mt-3 ${openSection.price ? 'flex-col' : 'hidden'}`}>
                            <input
                                type="range"
                                min={item.price.min}
                                max={item.price.max}
                                className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: 'linear-gradient(to right, #3b82f6 50%, #d1d5db 50%)',
                                }}
                            />
                            <div className="flex items-center space-x-2 mt-3">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-20 p-1 border border-gray-300 rounded text-sm text-gray-600"
                                />
                                <span className="text-gray-600">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-20 p-1 border border-gray-300 rounded text-sm text-gray-600"
                                />
                            </div>
                            <button className="text-blue-500 text-sm font-medium mt-2">Apply</button>
                        </div>
                    </>
                )}

                {/* condtiton section */}
                {
                    item.conditions && (
                        <>
                            <hr className="  border-gray-200 mb-3" />
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold capitalize">Conditions</p>
                                {
                                    openSection.condition
                                        ?
                                        <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, condition: false })} />
                                        :
                                        <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, condition: true })} />
                                }
                            </div>

                            {/* Content based on key */}
                            <div className={`space-y-4 ${openSection.condition ? 'flex-col' : 'hidden'}`}>
                                {
                                    item.conditions.map((condition, ind) => (

                                        <label key={ind} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="radio"
                                                className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded hover:cursor-pointer" />
                                            {condition}
                                        </label>
                                    ))
                                }
                            </div>
                        </>
                    )
                }

                {/* ratings section */}
                {
                    item.ratings && (
                        <>
                            <hr className="  border-gray-200 mb-3" />
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold capitalize">Ratings</p>
                                {
                                    openSection.ratings
                                        ?
                                        <FaChevronDown className='cursor-pointer' onClick={() => setopenSection({ ...openSection, ratings: false })} />
                                        :
                                        <FaChevronUp className='cursor-pointer' onClick={() => setopenSection({ ...openSection, ratings: true })} />
                                }
                            </div>

                            {/* Content based on key */}
                            <div className={`space-y-2 ${openSection.ratings ? 'flex-col' : 'hidden'}`}>
                                {
                                    item.ratings.map((rating, ind) => (


                                        <label key={ind} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="checkbox"
                                                className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded hover:cursor-pointer" />
                                            <span className="flex gap-1">
                                                {[...Array(rating)].map((_, i) => (
                                                    <span key={i} >
                                                        <Image src={'/images/star.png'} alt='star' width={20} height={20} />
                                                    </span>
                                                ))}
                                                {[...Array(5 - rating)].map((_, i) => (
                                                    <span key={i} >
                                                        <Image src={'/images/empty-star.png'} alt='star' width={20} height={20} />
                                                    </span>
                                                ))}
                                            </span>
                                        </label>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>

        ))
    )
}

export default RenderSidebarContent
