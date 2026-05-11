import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { queryKeys } from "@/lib/constants/query-keys";
import { MonthsRange } from "@/types/dashboard.types";

// Existing hooks
export const useDashboardCards = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.cards,
    queryFn: dashboardService.getDashboardCards,
  });
};

export const useAthletesTrend = (months: MonthsRange = 12) => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.athletesTrend, months],
    queryFn: () => dashboardService.getAthletesTrend(months),
    staleTime: 5 * 60 * 1000,
  });
};

// NEW: Challenge participants hook
export const useChallengeParticipants = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.challengeParticipants,
    queryFn: dashboardService.getChallengeParticipants,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};