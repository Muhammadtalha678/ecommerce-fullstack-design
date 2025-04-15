'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TbXboxXFilled } from 'react-icons/tb'
import { TiThMenu } from 'react-icons/ti'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 left-4 z-50 md:hidden"
            >
                {isOpen ? <TbXboxXFilled size={28} /> : <TiThMenu size={28} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                    <nav className="space-y-4">
                        <Link href="/admin" className="block text-lg hover:text-blue-600">
                            Dashboard
                        </Link>
                        <Link href="/admin/products" className="block text-lg hover:text-blue-600">
                            Products
                        </Link>
                    </nav>
                </div>
            </aside>
        </>
    )
}
