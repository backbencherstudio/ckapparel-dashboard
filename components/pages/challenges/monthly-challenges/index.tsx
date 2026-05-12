import PageTitle from "@/components/reuseable/PageTitle";
import CreateChallenge from "../all-challenges/CreateChallenge";
import MonthlyChallengesTable from "./MonthlyChallengesTable";



export default function AllChallengesPage() {
    return (
        <div>
            <PageTitle
                title='Monthly Challenges'
                description='Admin-created only'
                action={<CreateChallenge challengeType="monthly" />}

            />

            <MonthlyChallengesTable />
        </div>
    )
}
