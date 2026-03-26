import PageTitle from "@/components/reuseable/PageTitle";
import CreateChallenge from "../all-challenges/CreateChallenge";
import MonthlyChallengesTable from "./MonthlyChallengesTable";



export default function AllChallengesPage() {
    return (
        <div>
            <PageTitle
                title='All Challenges'
                description='View all challenges across all categories'
                action={<CreateChallenge />}

            />

            <MonthlyChallengesTable />
        </div>
    )
}
