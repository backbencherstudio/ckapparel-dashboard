import axios from "@/lib/axios";
import type { AthletesDetailsResponse, AthletesPayload, AthletesResponse } from "@/types/athletes.types";

const BASE = "/admin";

export const athletesService = {

  getAthletes: async () => {
    const response = await axios.get(`${BASE}/user`);
    return response.data as AthletesResponse;
  },


  getAthletesById: async (id: string | number) => {
    const response = await axios.get(`${BASE}/user/${id}`);
    return response.data as AthletesDetailsResponse;
  },


  // UPDATE: Ban athlete with status body (flexible version)
banAthlete: async (id: string, status: number = 0) => {
  const response = await axios.patch(`${BASE}/user/ban-unban/${id}`, {
    status: status // 0 = banned, 1 = active
  });
  return response.data;
},

}
