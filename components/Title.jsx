import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Title = ({ headingStart, headingEnd, subtext, hasAction, linkTo = '' }) => {
    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12'>
            <div className='max-w-2xl'>
                <h3 className='mb-3'>
                    <span className='text-base-content'>{headingStart} </span>
                    <span className='text-info font-light italic underline decoration-info underline-offset-4 decoration-2'>{headingEnd}</span>
                </h3>
                <p className='max-w-xl'>{subtext}</p>
            </div>
            {hasAction && (
                <Link href={linkTo} className='shrink-0'>
                    <button className='btn btn-info btn-outline btn-sm gap-2 group/normal'>
                        <span>{hasAction}</span>
                        <ArrowRight size={16} className='group-hover/normal:translate-x-1 transition-transform duration-300' />
                    </button>
                </Link>
            )}
        </div>
    );
}

export default Title