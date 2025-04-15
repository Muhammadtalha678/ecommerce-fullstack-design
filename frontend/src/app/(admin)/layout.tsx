import React from 'react'
import { Toaster } from 'react-hot-toast'

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            {children}
            <Toaster position='top-center' />
        </div>
    )
}

export default AdminLayout
