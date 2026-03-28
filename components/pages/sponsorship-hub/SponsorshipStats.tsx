import React from 'react'

import HandShakeIcon from '@/components/icons/HandShakeIcon'
import PendingIcon from '@/components/icons/PendingIcon'
import SuccessIcon from '@/components/icons/SuccessIcon'
import { StatsCard } from '../dashboard/StatsCards'



export default function SponsorshipStats() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
            <StatsCard title='Open Listing' value='130' icon={<HandShakeIcon />} />
            <StatsCard title='Pending Requests' value='2' icon={<PendingIcon />} />
            <StatsCard title='Fully Funded' value='23' icon={<SuccessIcon />} />


        </div>
    )
}
