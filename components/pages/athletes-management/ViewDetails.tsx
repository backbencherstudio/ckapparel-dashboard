import CustomButton from '@/components/reuseable/CustomButton';
import React from 'react'
import { useGetAthletesById } from '@/hooks/useAthletes';
import { useBanAthlete } from '@/hooks/useAthletes';

interface ViewDetailsProps {
  selectedAthleteId: string | null;
  onClose?: () => void;
}

export default function ViewDetails({ selectedAthleteId, onClose }: ViewDetailsProps) {

  const { data: userDetailsResponse, isLoading, error } = useGetAthletesById(
    selectedAthleteId ?? ''
  );
  const { mutate: banAthlete, isPending:isBanning } = useBanAthlete();
  const athlete = userDetailsResponse?.data;


  const handleBanAthlete = ( status: number = 0 ) => {
    banAthlete({ id: selectedAthleteId ?? '', status: status });
    onClose?.();
  }


  if (!selectedAthleteId) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-[#161616] rounded-3xl border border-white/10 shadow-2xl">
        <div className="animate-pulse text-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto"></div>
          <div className="h-6 bg-gray-700 rounded w-32 mx-auto mt-4"></div>
          <div className="h-4 bg-gray-700 rounded w-24 mx-auto mt-2"></div>
        </div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-[#161616] rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-red-500 text-center">
          Error loading athlete details
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md p-4 bg-[#161616] rounded-3xl border border-white/10 shadow-2xl">

      {/* Profile Image with Gradient Border */}
      <div className="relative p-[2px] rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500">
        <div className="bg-[#161616] rounded-full p-1">
          <img
            src={athlete.avatar || '/default-avatar.png'}
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
        {athlete.flag && (
          <img
            src={athlete.flag}
            alt="flag"
            className="w-5 h-auto rounded-sm"
          />
        )}
        <p className="text-sm font-medium">
          {athlete.country || 'N/A'} {athlete.age && `• Age ${athlete.age}`}
        </p>
      </div>

      {/* Additional Info */}
      <div className="mt-3 text-xs text-gray-500 text-center space-y-1">
        <p>Email: {athlete.email}</p>
        <p>Username: {athlete.username || 'Not set'}</p>
        <p>Joined: {new Date(athlete.created_at).toLocaleDateString()}</p>
        <p>Type: {athlete.type === 'su_admin' ? 'Super Admin' : athlete.type}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4 w-full">
        <StatsCard title="Challenges" value={athlete.challenges_joined} />
        <StatsCard title="Completed" value={athlete.challenges_completed} />
        <StatsCard title="Incomplete" value={athlete.challenges_incomplete} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-8 w-full">
        <CustomButton className='flex-1 rounded-md' variant="cancel" onClick={onClose}>
          <span>Cancel</span>
        </CustomButton>

       {
        athlete.status === 0 ? (
          <CustomButton className='flex-1 rounded-md' variant="approve" disabled={isBanning} onClick={() => handleBanAthlete(1)}>
            <span>Unban Athlete</span>
          </CustomButton>
        ) : (
          <CustomButton className='flex-1 rounded-md' variant="reject" disabled={isBanning} onClick={() => handleBanAthlete(0)}>
            <span>Ban Athlete</span>
          </CustomButton>
        )
       }
      </div>
    </div>
  )
}

const StatsCard = ({ title, value }: { title: string, value: number }) => {
  return (
    <div className="flex flex-col items-center gap-1 flex-[1_0_0] [background:rgba(255,255,255,0.05)] p-3 rounded-lg">
      <span className="self-stretch text-white text-center font-inter text-xl font-semibold leading-6">{value}</span>
      <span className="self-stretch text-neutral-300 text-center font-inter text-sm font-normal leading-5 mt-1">{title}</span>
    </div>
  )
}