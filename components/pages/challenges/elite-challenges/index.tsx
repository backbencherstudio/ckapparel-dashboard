import React from 'react'
import PageTitle from '@/components/reuseable/PageTitle'
import CreateChallenge from '../all-challenges/CreateChallenge'
import EliteChallengesTable from './EliteChallengesTable'

export default function EliteChallengesPage() {
  return (
    <div>
        <PageTitle
        title='Elite Challenges'
        description='Admin-created only'
        action={<CreateChallenge challengeType="elite" />}
      />

      <EliteChallengesTable />
    </div>
  )
}
