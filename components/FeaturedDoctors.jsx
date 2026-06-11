"use client"
import React from 'react'
import { useEffect } from 'react'
import DoctorCard from "./DoctorCard"
import Title from "./Title"
import LoadingSkeleton from './LoadingSkeleton'

import { useDoctorStore } from '../lib/zustand/doctorStore'
import { div } from 'framer-motion/client'
import EmptyState from './EmptyState'
import { GlobeOff } from 'lucide-react'

const FeaturedDoctors = () => {
    const { doctors, isLoading, error, fetchDoctors } = useDoctorStore()

    useEffect(() => {
        if (doctors.length === 0) {
            fetchDoctors()
        }

    }, [doctors.length, fetchDoctors])

    const featuredDoctors = doctors.slice(0, 4)

    return (
        <section className='max-w-7xl mx-auto px-6 pt-28'>
            <Title
                headingStart="Featured"
                headingEnd="Doctors"
                subtext="Choose a specialist for a voice consultation. Free doctors are available to everyone; Premium doctors need a subscription"
                hasAction={"View All"}
                linkTo='/doctors'
            />

            {isLoading && featuredDoctors.length === 0 ? (
                <div>
                    <LoadingSkeleton />
                </div>
            ) : error ? (
                <div className='alert alert-error rounded-2xl border border-error/20'><span className='text-sm font-semibold'>{error}</span>
                </div>
            ) : featuredDoctors.length === 0 ? (

                <EmptyState
                    icon={<GlobeOff />}
                    title="No doctors available"
                    description="There are no featured doctors to display right now. Please check back later."
                />

            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {featuredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.slug} doctor={doctor} />
                    ))}


                    {/* {featuredDoctors.map((doctor, index) => (
                        <DoctorCard key={doctor.id ?? doctor._id ?? index} doctor={doctor} />
                    ))} */}
                </div>
            )}

        </section>
    )
}

export default FeaturedDoctors