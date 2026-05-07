"use client";

import React from 'react'

import HandShakeIcon from '@/components/icons/HandShakeIcon'
import PendingIcon from '@/components/icons/PendingIcon'
import SuccessIcon from '@/components/icons/SuccessIcon'

import { useGetSponsorshipHubSummary } from '@/hooks/useSponsorship'

export default function SponsorshipStats() {
    const { data, isLoading, error } = useGetSponsorshipHubSummary();
    const sponsorshipHubSummary = data?.data;

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
                {[1, 2, 3].map((i) => (
                    <div key={i} className='bg-[#161616] p-4 border border-[#FFFFFF1A] rounded-xl animate-pulse'>
                        <div className='h-[42px] w-[42px] bg-gray-700 rounded-full mb-4'></div>
                        <div className='h-8 bg-gray-700 rounded w-20 mb-2'></div>
                        <div className='h-4 bg-gray-700 rounded w-32'></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
                <div className='bg-[#161616] p-4 border border-red-500 rounded-xl col-span-full text-red-500 text-center'>
                    Error loading sponsorship data: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
            <StatsCard 
                title='Open Listing' 
                value={sponsorshipHubSummary?.openListing?.total?.toString() || '0'} 
                icon={<HandShakeIcon />}
                weeklyChange={sponsorshipHubSummary?.openListing?.newThisWeek}
            />
            <StatsCard 
                title='Pending Requests' 
                value={sponsorshipHubSummary?.pendingRequests?.total?.toString() || '0'} 
                icon={<PendingIcon />}
                weeklyChange={sponsorshipHubSummary?.pendingRequests?.newThisWeek}
            />
            <StatsCard 
                title='Fully Funded' 
                value={sponsorshipHubSummary?.fullyCompleted?.total?.toString() || '0'} 
                icon={<SuccessIcon />}
                weeklyChange={sponsorshipHubSummary?.fullyCompleted?.newThisWeek}
            />
        </div>
    )
}


export const StatsCard = ({ 
    title, 
    value, 
    icon, 
    weeklyChange 
}: { 
    title: string, 
    value: string, 
    icon: React.ReactNode,
    weeklyChange?: number
}) => {
    const isPositive = weeklyChange && weeklyChange > 0;
    const isNegative = weeklyChange && weeklyChange < 0;
    
    return (
        <div className='bg-[#161616] p-4 border border-[#FFFFFF1A] rounded-xl'>
            {/* title and icon */}
            <div className='flex items-center gap-3'>
                <div className='flex w-[42px] h-[42px] justify-center items-center [background:rgba(246,214,66,0.20)] p-[11px] rounded-[32px] shrink-0 text-[#F6D642]'>
                    {icon}
                </div>
                <h3 className='text-white text-base font-normal leading-[150%]'>{title}</h3>
            </div>
            
            {/* value */}
            <p className='self-stretch text-white text-4xl font-semibold leading-[120%] mt-4'>{value}</p>
            
            {/* weekly change indicator */}
            {weeklyChange !== undefined && weeklyChange !== 0 && (
                <div className='flex items-center justify-start gap-2 mt-2'>
                    {isPositive && (
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.30174 0.60375L11.6816 5.79784C12.4176 6.67084 11.7937 7.99975 10.6477 7.99975H1.35179C0.205789 7.99975 -0.418146 6.66984 0.317854 5.79784L4.69774 0.60375C5.37674 -0.20125 6.62274 -0.20125 7.30174 0.60375Z" fill="#22C55E"/>
                        </svg>
                    )}
                    {isNegative && (
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                            <path d="M7.30174 0.60375L11.6816 5.79784C12.4176 6.67084 11.7937 7.99975 10.6477 7.99975H1.35179C0.205789 7.99975 -0.418146 6.66984 0.317854 5.79784L4.69774 0.60375C5.37674 -0.20125 6.62274 -0.20125 7.30174 0.60375Z" fill="#EF4444"/>
                        </svg>
                    )}
                    <p className={`${isPositive ? 'text-[#22C55E]' : 'text-red-500'} text-base font-normal leading-[150%] text-right`}>
                        {isPositive ? '+' : ''}{weeklyChange} this week
                    </p>
                </div>
            )}
        </div>
    )
}