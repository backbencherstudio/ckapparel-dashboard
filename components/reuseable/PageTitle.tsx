import React from 'react'

import { Plus } from 'lucide-react'

interface PageTitleProps {
    title: string
    description?: string
    action?: React.ReactNode
}

export default function PageTitle({ title, description, action }: PageTitleProps) {
    return (
        <div className='flex items-center justify-between pb-6 '>
            {/* left side */}
            <div className='flex flex-col gap-[8px]'>
                <h1 className='text-white  text-2xl font-semibold leading-[150%]'>{title}</h1>
                <p className='text-[#5B5B5B]  text-base font-normal leading-[150%]'>{description}</p>
            </div>
            {/* right side */}
            {action}

        </div>
    )
}
