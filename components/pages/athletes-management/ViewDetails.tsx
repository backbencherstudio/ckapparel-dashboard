import CustomButton from '@/components/reuseable/CustomButton';
import React from 'react'
// {
//     "id": "4",
//     "name": "Anya Petrova",
//     "username": "@anya_run",
//     "avatar": "/avatars/anya.jpg",
//     "country": "Germany",
//     "challenges": 31,
//     "joined": "20 Nov, 2025",
//     "status": "Active"
// }
export default function ViewDetails({ selectedAthletes }: { selectedAthletes: any }) {

    // Mock data based on your object structure
    const athlete = {
        name: "Jordan Davies",
        country: "Australia",
        age: 29,
        challenges: 14,
        completed: 3,
        incomplete: 11,
        imageUrl: "https://via.placeholder.com/150" // Replace with actual image
    };

    console.log(selectedAthletes);
    return (
        <div className="flex flex-col items-center w-full max-w-md p-4 bg-[#161616] rounded-3xl border border-white/10 shadow-2xl ">

            {/* Profile Image with Gradient Border */}
            <div className="relative p-[2px] rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500">
                <div className="bg-[#161616] rounded-full p-1">
                    <img
                        src={athlete.imageUrl}
                        alt={athlete.name}
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                </div>
            </div>

            {/* Name and Basic Info */}
            <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">
                {athlete.name}
            </h2>

            <div className="flex items-center gap-2 mt-2 text-gray-400">
                <img
                    src="https://flagcdn.com/w20/au.png"
                    alt="flag"
                    className="w-5 h-auto rounded-sm"
                />
                <p className="text-sm font-medium">{athlete.country} • Age {athlete.age}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-4 w-full">
                <StatsCard title="Challenges" value={athlete.challenges} />
                <StatsCard title="Completed" value={athlete.completed} />
                <StatsCard title="Incomplete" value={athlete.incomplete} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-8 w-full">


                <CustomButton className='flex-1 rounded-md' variant="cancel">
                    <span> Cancel </span>
                </CustomButton>

                <CustomButton className='flex-1 rounded-md' variant="reject">
                    <span> Ban Athlete </span>
                </CustomButton>
            </div>
        </div>
    )
}

const StatsCard = ({ title, value }: { title: string, value: number }) => {
    return (
        <div className="flex flex-col items-center gap-1 flex-[1_0_0] [background:rgba(255,255,255,0.05)] p-3 rounded-lg">
            <span className="self-stretch text-white text-center [font-family:Inter] text-xl font-semibold leading-6">{value}</span>
            <span className="self-stretch text-neutral-300 text-center [font-family:Inter] text-sm font-normal leading-5 mt-1">{title}</span>
        </div>
    )
}
