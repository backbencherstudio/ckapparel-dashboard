import SupportIcon from "@/components/icons/SupportIcon";
import { StatsCard } from "../dashboard/StatsCards";
import HandShakeIcon from "@/components/icons/HandShakeIcon";
import QuotationIcon from "@/components/icons/QuotationIcon";
import ChallengesIcon from "@/components/icons/ChallengesIcon";

export default function StatsCards() {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] '>
            <StatsCard title='Total Support Plans' value='100' icon={<SupportIcon  />} />
            <StatsCard title='Active Plans' value='147' icon={<SupportIcon />} />
            <StatsCard title='Total Challenges' value='20'     icon={<ChallengesIcon />} />
            <StatsCard title='Active Challenges' value='106' icon={<ChallengesIcon />} />
        </section>
    )
}

