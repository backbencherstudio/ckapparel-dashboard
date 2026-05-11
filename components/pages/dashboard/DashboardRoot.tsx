'use client';


import ChallengesListTable from '../challenges/all-challenges/ChallengeList'
import StatsCards from './StatsCards'
import TotalParticipantPieChart from './TotalParticipantPieChart'
import RegisteredVsActive from './RegisterdVsActive'


export default function DashboardPage() {

  return (
    <div className='space-y-[24px]'>
      <StatsCards />
      <div className='flex flex-col md:flex-row items-center justify-between gap-[20px] h-full'>

        <div className='w-full  flex-1 h-full'>
          <RegisteredVsActive />
        </div>
        <div className='w-full max-w-[485px] h-full'>
          <TotalParticipantPieChart />
        </div>
      </div>
 
      {/* <ChallengesListTable /> */}
    </div>
  )
}
