import axios from "@/lib/axios";
import { ChallengesResponse, GetChallengesParams } from "@/types/challenges.types";
import { buildApiParams } from "@/lib/utils";

export const challengeService = {
  getChallenges: async (params?: GetChallengesParams) => {
    const response = await axios.get("/admin/challenges", { 
      params: buildApiParams(params as Record<string, unknown>) 
    });
    return response.data as ChallengesResponse;
  },
};