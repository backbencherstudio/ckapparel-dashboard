import axios from "@/lib/axios";
import { 
  DashboardSummaryResponse, 
  AthletesTrendResponse,
  ChallengeParticipantsResponse,
  MonthsRange 
} from "@/types/dashboard.types";

export const dashboardService = {
  // Existing services
  getDashboardCards: async () => {
    const response = await axios.get("/admin/dashboard/cards");
    return response.data as DashboardSummaryResponse;
  },
  

  
  getAthletesTrend: async (months: MonthsRange = 12) => {
    const response = await axios.get(`/admin/dashboard/athletes-trend`, {
      params: { months }
    });
    return response.data as AthletesTrendResponse;
  },
  
  // NEW: Challenge participants service
  getChallengeParticipants: async () => {
    const response = await axios.get("/admin/dashboard/challenge-participants");
    return response.data as ChallengeParticipantsResponse;
  },
};