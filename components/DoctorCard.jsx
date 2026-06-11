import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Star, Video, Heart } from 'lucide-react'

const DoctorCard = ({ doctor }) => {

    const { avatarUrl, name, slug, specialty, description, requiredPlan, sortOrder, rating = 4.9 } = doctor

    return (
        <div className='card bg-linear-to-br from-info/15 via-info/5 to-transparent hover:shadow-xl hover:shadow-info/5 hover:-translate-y-1 transition-all duration-500 group'>
            <div className="card-body p-5 gap-4">
                <div className='flex gap-4'>
                    <div className='avatar online-0'>
                        <div className='w-16 rounded-xl'>
                            <Image src={avatarUrl} alt={name} width={64} height={64} priority={sortOrder <= 4} className='object-cover' />
                        </div>
                    </div>
                    <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                            <h5 className='truncate'>{name}</h5>
                            <span className={`badge badge-xs ${requiredPlan === "PREMIUM" ? "badge-warning" : "badge-primary"}`}>
                                {requiredPlan}
                            </span>
                        </div>
                        <p className='text-xs text-base-content/60 mb-1.5'>{specialty}</p>
                        {/* Rating - Hard-coded */}
                        <div className='flex items-center gap-1'>
                            <Star className='size-3.5 fill-warning text-warning' />
                            <span className='text-sm font-semibold'>{rating}</span>
                            <span className='text-xs text-base-content/40'>200</span>
                        </div>
                    </div>
                </div>
                <p className="line-clamp-2">{description}</p>
                <div className="card-actions pt-1">
                    <Link href={`/doctors/${slug}`} className="btn btn-info btn-sm flex-1 rounded-xl gap-2 shadow-lg shadow-info/15 hover:shadow-info/25">
                        <Video className="size-4" />
                        <span>Consult Now</span>
                        <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <button className="btn btn-outline btn-info btn-square btn-sm rounded-xl">
                        <Heart className="size-4" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default DoctorCard