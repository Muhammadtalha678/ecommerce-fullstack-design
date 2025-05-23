import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import TopNav from '@/components/common/Header/Navbar'
import React from 'react'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <Header />
            <TopNav />
            {children}
            <Footer />
        </div>
    )
}

export default PublicLayout
