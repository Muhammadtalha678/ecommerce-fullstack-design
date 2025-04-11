import React from 'react'
import { Toaster } from 'react-hot-toast'

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            {children}
            <Toaster position='top-center' />
        </div>
    )
}

export default AuthLayout
