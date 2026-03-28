import React from 'react'

import HandShakeIcon from '@/components/icons/HandShakeIcon'
import PendingIcon from '@/components/icons/PendingIcon'
import SuccessIcon from '@/components/icons/SuccessIcon'



export default function SponsorshipStats() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
            <StatsCard2 title='Open Listing' value='130' icon={<HandShakeIcon />} />
            <StatsCard2 title='Pending Requests' value='2' icon={<PendingIcon />} />
            <StatsCard2 title='Fully Funded' value='23' icon={<SuccessIcon />} />


        </div>
    )
}


export const StatsCard2 = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => {
    return (
        <div className='bg-[#161616] p-4 border border-[#FFFFFF1A] rounded-xl'>
            {/* title and icon */}
            <div className='flex items-center  gap-3 '>
                <div className='flex w-[42px] h-[42px] justify-center items-center  [background:rgba(246,214,66,0.20)] p-[11px] rounded-[32px] shrink-0 text-[#F6D642]'>
                    {icon}
                </div>
                <h3 className='text-white  text-base font-normal leading-[150%]'>{title}</h3>
            </div>
            {/* value */}
            <p className='self-stretch text-white  text-4xl font-semibold leading-[120%] mt-4'>{value}</p>
            {/* arrow icon */}
            <div className='flex items-center justify-start gap-2'>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.30174 0.60375L11.6816 5.79784C12.4176 6.67084 11.7937 7.99975 10.6477 7.99975H1.35179C0.205789 7.99975 -0.418146 6.66984 0.317854 5.79784L4.69774 0.60375C5.37674 -0.20125 6.62274 -0.20125 7.30174 0.60375Z" fill="#22C55E"/>
                </svg>
                <p className='text-[#22C55E] text-base font-normal leading-[150%] text-right'>+124 this week</p>
            </div>
        </div>
    )
}
