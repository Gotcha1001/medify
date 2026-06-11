
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

import React from 'react'



const PublicLayout = ({ children }) => {
    return (
        <main className='mx-auto max-w-360 px-2 lg:px-12 overflow-x-hidden'>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default PublicLayout