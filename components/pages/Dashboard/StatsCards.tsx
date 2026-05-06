import React from 'react'
import AthletesIcon from '@/components/icons/AthletesIcon'
import ChallengesIcon from '@/components/icons/ChallengesIcon'
import HandShakeIcon from '@/components/icons/HandShakeIcon'
import QuotationIcon from '@/components/icons/QuotationIcon'
import { useDashboardCards } from '@/hooks/useDashboard'

export default function StatsCards() {
    const { data, isLoading, error } = useDashboardCards();
    const dashboardData = data?.data;

    // Show loading state
    if (isLoading) {
        return (
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]'>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className='bg-[#161616] p-4 border border-[#FFFFFF1A] rounded-xl animate-pulse'>
                        <div className='h-[42px] w-[42px] bg-gray-700 rounded-full mb-4'></div>
                        <div className='h-8 bg-gray-700 rounded w-20 mb-2'></div>
                        <div className='h-4 bg-gray-700 rounded w-32'></div>
                    </div>
                ))}
            </section>
        );
    }

    // Show error state
    if (error) {
        return (
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]'>
                <div className='bg-[#161616] p-4 border border-red-500 rounded-xl col-span-full text-red-500 text-center'>
                    Error loading dashboard data: {error.message}
                </div>
            </section>
        );
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]'>
            <StatsCard 
                title='Total Athletes' 
                value={dashboardData?.totalAthletes?.value?.toString() || '0'} 
                icon={<AthletesIcon />}
                weeklyData={dashboardData?.totalAthletes?.weekly}
            />
            <StatsCard 
                title='Active Challenges' 
                value={dashboardData?.activeChallenges?.value?.toString() || '0'} 
                icon={<ChallengesIcon />}
                weeklyData={dashboardData?.activeChallenges?.weekly}
            />
            <StatsCard 
                title='Open Sponsorships' 
                value={dashboardData?.openSponsorships?.value?.toString() || '0'} 
                icon={<HandShakeIcon />}
                weeklyData={dashboardData?.openSponsorships?.weekly}
            />
            <StatsCard 
                title='Quotation Requests' 
                value={dashboardData?.quotationRequests?.value?.toString() || '0'} 
                icon={<QuotationIcon />}
                weeklyData={dashboardData?.quotationRequests?.weekly}
            />
        </section>
    )
}

export const StatsCard = ({ 
    title, 
    value, 
    icon, 
    weeklyData 
}: { 
    title: string, 
    value: string, 
    icon: React.ReactNode,
    weeklyData?: {
        delta: number;
        direction: 'up' | 'down' | 'flat';
        percentage: number;
    }
}) => {
    // Determine color based on direction
    const getDirectionColor = () => {
        if (!weeklyData) return 'text-gray-400';
        if (weeklyData.direction === 'up') return 'text-[#22C55E]';
        if (weeklyData.direction === 'down') return 'text-red-500';
        return 'text-gray-400';
    };

    // Determine arrow icon based on direction
    const getArrowIcon = () => {
        if (!weeklyData || weeklyData.direction === 'flat') {
            return (
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L12 8H0L6 0Z" fill="#9CA3AF"/>
                </svg>
            );
        }
        if (weeklyData.direction === 'up') {
            return (
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.30174 0.60375L11.6816 5.79784C12.4176 6.67084 11.7937 7.99975 10.6477 7.99975H1.35179C0.205789 7.99975 -0.418146 6.66984 0.317854 5.79784L4.69774 0.60375C5.37674 -0.20125 6.62274 -0.20125 7.30174 0.60375Z" fill="#22C55E"/>
                </svg>
            );
        }
        return (
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                <path d="M7.30174 0.60375L11.6816 5.79784C12.4176 6.67084 11.7937 7.99975 10.6477 7.99975H1.35179C0.205789 7.99975 -0.418146 6.66984 0.317854 5.79784L4.69774 0.60375C5.37674 -0.20125 6.62274 -0.20125 7.30174 0.60375Z" fill="#EF4444"/>
            </svg>
        );
    };

    // Format the weekly change text
    const getWeeklyText = () => {
        if (!weeklyData) return 'No data available';
        if (weeklyData.direction === 'flat') return 'No change this week';
        const prefix = weeklyData.delta > 0 ? '+' : '';
        return `${prefix}${weeklyData.delta} this week (${weeklyData.percentage}%)`;
    };

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
            <div className='flex items-center justify-start gap-2 mt-2'>
                {getArrowIcon()}
                <p className={`${getDirectionColor()} text-base font-normal leading-[150%] text-right`}>
                    {getWeeklyText()}
                </p>
            </div>
        </div>
    )
}