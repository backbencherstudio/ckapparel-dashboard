import React from 'react'
import StatsCards from './StatsCards'
import RegisterdVsActive from './RegisterdVsActive'
import TotalParticipantPieChart from './TotalParticipantPieChart'

export default function DashboardPage() {
  return (
    <div className='space-y-[24px]'>
        <StatsCards />
        <div className='flex flex-col md:flex-row items-center justify-between gap-[20px] h-full'>

        <div className='w-full  flex-1 h-full'>
          <RegisterdVsActive />
        </div>
        <div className='w-full max-w-[485px] h-full'>
          <TotalParticipantPieChart />
        </div>
        </div>
    </div>
  )
}
