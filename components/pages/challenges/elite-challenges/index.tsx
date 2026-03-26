import React from 'react'
import PageTitle from '@/components/reuseable/PageTitle'
import CreateChallenge from '../all-challenges/CreateChallenge'
import EliteChallengesTable from './EliteChallengesTable'

export default function EliteChallengesPage() {
  return (
    <div>
        <PageTitle
        title='Virtual Adventure'
        description='Admin-created only'
        action={<CreateChallenge  />}
      />

      <EliteChallengesTable />
    </div>
  )
}
