import Sidebar from '@/components/Admin/SideBar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-900">
            <Sidebar />
            <main className="flex-1 p-4 md:ml-64 transition-all duration-300">
                {children}
                <Toaster position="top-center" />
            </main>
        </div>
    )
}

export default AdminLayout
