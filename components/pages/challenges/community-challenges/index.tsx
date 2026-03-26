import CustomButton from "@/components/reuseable/CustomButton";
import PageTitle from "@/components/reuseable/PageTitle";
import PendingCommunityChallenges from "./PendingCommunityChallenges";
import ActiveCommunityChallenges from "./ActiveCommunityChallenges";




export default function CommunityChallengesPage() {
    return (
        <div>
            <PageTitle
                title='All Challenges'
                description='View all challenges across all categories'
                action={<RightSideAction />}

            />

            {/* <AllChallengesTable /> */}

            <div className="space-y-6">
                <PendingCommunityChallenges />

                <ActiveCommunityChallenges />
            </div>
        </div>
    )
}


const RightSideAction = () => {
    return (
        <div className="flex gap-2">
            <CustomButton>
                Approve All
            </CustomButton>
            <CustomButton variant="danger">
                Reject All
            </CustomButton>

        </div>)
}