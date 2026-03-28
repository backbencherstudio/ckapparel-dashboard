import React from 'react'
import SupportStats from './SupportStats'
import PageHeading from '@/components/reuseable/PageHeading'
import PageTitle from '@/components/reuseable/PageTitle'
import AllSupportsPlans from './AllSupportsPlans'

export default function SupportPage() {
    return (
        <div>
            <PageTitle
                title='Support Plans Management'
                description='Manage Support Plans and create new' />
            <div className='my-6'>
                <SupportStats />
            </div>

{/* all supports plans */}
            <div>
                <AllSupportsPlans />
            </div>
        </div>
    )
}
