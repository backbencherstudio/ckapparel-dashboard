"use client";

import SupportIcon from "@/components/icons/SupportIcon";
import ChallengesIcon from "@/components/icons/ChallengesIcon";
import { useGetSupportPlanDashboardCards } from "@/hooks/useSupport";

export default function StatsCards() {
    const { data, isLoading, error } = useGetSupportPlanDashboardCards();
    const dashboardData = data?.data;

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
                title='Total Support Plans' 
                value={dashboardData?.totalSupportPlans?.value?.toString() || '0'} 
                icon={<SupportIcon />}
                weeklyChange={dashboardData?.totalSupportPlans?.weeklyChange}
            />
            <StatsCard 
                title='Active Plans' 
                value={dashboardData?.activePlans?.value?.toString() || '0'} 
                icon={<SupportIcon />}
                weeklyChange={dashboardData?.activePlans?.weeklyChange}
            />
            <StatsCard 
                title='Total Challenges' 
                value={dashboardData?.totalChallenges?.value?.toString() || '0'} 
                icon={<ChallengesIcon />}
                weeklyChange={dashboardData?.totalChallenges?.weeklyChange}
            />
            <StatsCard 
                title='Active Challenges' 
                value={dashboardData?.activeChallenges?.value?.toString() || '0'} 
                icon={<ChallengesIcon />}
                weeklyChange={dashboardData?.activeChallenges?.weeklyChange}
            />
        </section>
    )
}

const StatsCard = ({ 
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
            
            {/* weekly change */}
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