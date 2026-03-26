import React from 'react'
import AtheleInfoTable from './AtheleInfoTable'
import PageTitle from '@/components/reuseable/PageTitle'
import { Button } from '@/components/ui/button'



export default function AthletesManagementPage() {
    return (
        <div className='space-y-[24px]'>

            {/* title */}
            <PageTitle
                title='Athletes Management'
                description='Manage your athletes'
               
            />

            {/* table */}
            <AtheleInfoTable />
        </div>
    )
}
