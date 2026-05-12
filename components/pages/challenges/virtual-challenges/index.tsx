import PageTitle from '@/components/reuseable/PageTitle'
import React from 'react'
import VirtualChallengesTable from './VirtualChallengesTable'
import CreateChallenge from '../all-challenges/CreateChallenge'

export default function VirtualChallengesPages() {
    return (
        <div>
            <PageTitle
                title='Virtual Adventure'
                description='Admin-created only'
                action={<CreateChallenge challengeType="virtual" />}
            />

            {/* table */}
            <VirtualChallengesTable />

        </div>
    )
}
