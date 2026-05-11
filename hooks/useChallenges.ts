import { GetChallengesParams } from "@/types/challenges.types";
import { useQuery } from "@tanstack/react-query";
import { challengeService } from "@/services/challenges.service";
import { buildApiParams } from "@/lib/utils";


const KEY = ['challenges'];

export const useGetChallenges = (params?: GetChallengesParams) => {
  return useQuery({
    queryKey: [...KEY, params],
    queryFn: () => challengeService.getChallenges(buildApiParams(params as Record<string, unknown>)),
    staleTime: 5 * 60 * 1000,
  });
};