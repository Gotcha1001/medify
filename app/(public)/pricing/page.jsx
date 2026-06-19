import Title from '@/components/Title'
import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const PricingPage = () => {
    return (
        <div className='py-12 space-y-12'>
            <Title
                headingStart="Choose"
                headingEnd="Plan"
                subtext="Free tier includes general practice doctors. Premium unlocks all specialists icluding sports medicine."
            />
            <div className='flexCenter max-w-3xl'>
                <PricingTable />
            </div>
        </div>
    )
}

export default PricingPage