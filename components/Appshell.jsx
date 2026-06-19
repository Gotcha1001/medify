import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Appshell = ({ children }) => {
    return (
        <main className='mx-auto max-w-360 px-2 lg:px-12 overflow-x-hidden'>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default Appshell