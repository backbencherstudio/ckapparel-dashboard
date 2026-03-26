import PageTitle from "@/components/reuseable/PageTitle";
import AllChallengesTable from "./AllChallengesTable";
import CreateChallenge from "./CreateChallenge";



export default function AllChallengesPage() {
    return (
        <div>
            <PageTitle
                title='All Challenges'
                description='View all challenges across all categories'
                action={<CreateChallenge />}

            />

            <AllChallengesTable />
        </div>
    )
}
