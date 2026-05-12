import axios from "@/lib/axios";
import { ChallengesResponse, GetChallengesParams, CreateChallengePayload, Challenge, RoutePlan, RoutePlansResponse, GetRoutePlansParams, CreateRoutePlanPayload } from "@/types/challenges.types";
import { buildApiParams } from "@/lib/utils";

const BASE_URL = "/admin/challenges";

export const challengeService = {
  getChallenges: async (params?: GetChallengesParams) => {
    const response = await axios.get(BASE_URL, { 
      params: buildApiParams(params as Record<string, unknown>) 
    });
    return response.data as ChallengesResponse;
  },

  getChallengeById: async (id: string) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data as Challenge;
  },

  createMonthlyChallenge: async (payload: CreateChallengePayload) => {
    const response = await axios.post(`${BASE_URL}/monthly`, payload);
    return response.data;
  },

  createVirtualAdventureChallenge: async (payload: CreateChallengePayload) => {
    const response = await axios.post(`${BASE_URL}/virtual-adventure`, payload);
    return response.data;
  },

  createEliteChallenge: async (payload: CreateChallengePayload) => {
    const response = await axios.post(`${BASE_URL}/elite`, payload);
    return response.data;
  },

  createCommunityChallenge: async (payload: CreateChallengePayload) => {
    const response = await axios.post(`${BASE_URL}/community`, payload);
    return response.data;
  },

  updateChallenge: async (id: string, payload: CreateChallengePayload) => {
    const response = await axios.patch(`${BASE_URL}/update/${id}`, payload);
    return response.data;
  },

  deleteChallenge: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },

  reviewSubmission: async (id: string, status: string) => {
    const response = await axios.patch(`${BASE_URL}/submission-review/${id}`, { status });
    return response.data;
  },

  // Route Plan Endpoints
  getRoutePlans: async (params?: GetRoutePlansParams) => {
    const response = await axios.get(`${BASE_URL}/route-plan/list`, {
      params: buildApiParams(params as Record<string, unknown>)
    });
    return response.data as RoutePlansResponse;
  },

  getRoutePlanById: async (routePlanId: string) => {
    const response = await axios.get(`${BASE_URL}/route-plan/${routePlanId}`);
    return response.data as RoutePlan;
  },

  createRoutePlan: async (challengeId: string, payload: CreateRoutePlanPayload) => {
    const response = await axios.post(`${BASE_URL}/${challengeId}/route-plan`, payload);
    return response.data;
  },

  updateRoutePlan: async (routePlanId: string, payload: CreateRoutePlanPayload) => {
    // Note: Assuming endpoint is /route-plan/{id}/edit based on standard REST patterns,
    // although the original request noted /routePlanId/edit.
    const response = await axios.patch(`${BASE_URL}/route-plan/${routePlanId}/edit`, payload);
    return response.data;
  },

  // Community Submission
  submitCommunityChallenge: async (payload: any) => {
    const response = await axios.post(`${BASE_URL}/community/submit`, payload);
    return response.data;
  },

};