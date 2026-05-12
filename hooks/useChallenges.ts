import { GetChallengesParams, CreateChallengePayload, GetRoutePlansParams, CreateRoutePlanPayload } from "@/types/challenges.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useGetChallengeById = (id: string) => {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => challengeService.getChallengeById(id),
    enabled: !!id,
  });
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, payload }: { type: 'monthly' | 'virtual' | 'elite' | 'community', payload: CreateChallengePayload }) => {
      switch (type) {
        case 'monthly': return challengeService.createMonthlyChallenge(payload);
        case 'virtual': return challengeService.createVirtualAdventureChallenge(payload);
        case 'elite': return challengeService.createEliteChallenge(payload);
        case 'community': return challengeService.createCommunityChallenge(payload);
        default: throw new Error('Invalid challenge type');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: CreateChallengePayload }) => 
      challengeService.updateChallenge(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => challengeService.deleteChallenge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useReviewSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => 
      challengeService.reviewSubmission(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

// ================= Route Plan Hooks =================

export const useGetRoutePlans = (params?: GetRoutePlansParams) => {
  return useQuery({
    queryKey: [...KEY, 'route-plans', params],
    queryFn: () => challengeService.getRoutePlans(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetRoutePlanById = (routePlanId: string) => {
  return useQuery({
    queryKey: [...KEY, 'route-plan', routePlanId],
    queryFn: () => challengeService.getRoutePlanById(routePlanId),
    enabled: !!routePlanId,
  });
};

export const useCreateRoutePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ challengeId, payload }: { challengeId: string, payload: CreateRoutePlanPayload }) => 
      challengeService.createRoutePlan(challengeId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, 'route-plans'] });
    },
  });
};

export const useUpdateRoutePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ routePlanId, payload }: { routePlanId: string, payload: CreateRoutePlanPayload }) => 
      challengeService.updateRoutePlan(routePlanId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, 'route-plans'] });
      queryClient.invalidateQueries({ queryKey: [...KEY, 'route-plan'] });
    },
  });
};

// ================= Community Submission Hook =================

export const useSubmitCommunityChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => challengeService.submitCommunityChallenge(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};
