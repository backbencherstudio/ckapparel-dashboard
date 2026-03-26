import React from 'react'
type Props = {
    title: string;
    subtitle: string;
}

export default function PageHeading({ title, subtitle }: Props) {
    return (
        <div className=''>
            <h2 className='text-white [font-family:Inter] text-2xl font-semibold leading-[150%] mb-2'>{title}</h2>
            <p className='text-[#5B5B5B] [font-family:Inter] text-base font-normal leading-[150%]'>{subtitle}</p>
        </div>
    )
}
