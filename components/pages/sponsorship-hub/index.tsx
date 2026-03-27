import React from 'react'
import SponsorshipStats from './SponsorshipStats'
import PendingReviewTable from './PendingReviewTable'
import ActiveSponsorshipTable from './ActiveSponsorshipTable'

export default function SponsorshipHub() {
  return (
    <div className='space-y-6'>
      <SponsorshipStats/>
      <PendingReviewTable/>
      <ActiveSponsorshipTable/>
    </div>
  )
}
