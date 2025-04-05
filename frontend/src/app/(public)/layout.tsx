import Header from '@/components/common/Header/Header'
import React from 'react'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default PublicLayout
