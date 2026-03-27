import PageTitle from '@/components/reuseable/PageTitle'
import React from 'react'
import CreateSupportPlan from './CreateSupportPlan'
import PlanCard from './PlanCard'

export default function AllSupportsPlans() {
  return (
    <div>
        <PageTitle
        title='Support Plans Management'
        action={<CreateSupportPlan />}
        />  

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <PlanCard title='Basic Support Plan' />
            <PlanCard title='Premium Support Plan' />
            <PlanCard title='Enterprise Support Plan' />
        </section>
    </div>
  )
}
