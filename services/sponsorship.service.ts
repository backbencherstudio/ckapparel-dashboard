import axios from "@/lib/axios";
import type { ActiveListingResponse, DeleteSponsorshipResponse, PendingSponsorshipResponse, SponsorshipDetailResponse, SponsorshipHubSummaryResponse, UpdateSponsorshipStatusResponse } from "@/types/sponsorship.types";

const BASE = "/sponsorship";

export const sponsorshipService = {
  // NEW: Get sponsorship hub summary
  getSponsorshipHubSummary: async () => {
    const response = await axios.get("/admin/sponsorship/hub/summary");
    return response.data as SponsorshipHubSummaryResponse;
  },

  // NEW: Get pending sponsorship reviews
  getPendingSponsorships: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
  }) => {
    const response = await axios.get("/admin/sponsorship/hub/pending-review", { params });
    return response.data as PendingSponsorshipResponse;
  },



  // NEW: Get active listings
  getActiveListings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
  }) => {
    const response = await axios.get("/admin/sponsorship/hub/active-listings", { params });
    return response.data as ActiveListingResponse;
  },


  // NEW: Update sponsorship status
  updateSponsorshipStatus: async (id: string, status: string) => {
    const response = await axios.patch(`/admin/sponsorship/${id}/status`, {
      status: status
    });
    return response.data as UpdateSponsorshipStatusResponse;
  },


  // NEW: Delete sponsorship
  deleteSponsorship: async (id: string) => {
    const response = await axios.delete(`/admin/sponsorship/${id}`);
    return response.data as DeleteSponsorshipResponse;
  },


  // NEW: Get sponsorship by id
  // NEW: Get sponsorship details
getSponsorshipDetail: async (id: string) => {
  const response = await axios.get(`/admin/sponsorship/hub/${id}`);
  return response.data as SponsorshipDetailResponse;
},
  // getById: async (id: string | number) => {
  //   const response = await axios.get(`${BASE}/${id}`);
  //   return response.data as SponsorshipResponse | null;
  // },

  // create: async (data: SponsorshipPayload) => {
  //   const response = await axios.post(BASE, data);
  //   return response.data as SponsorshipResponse | null;
  // },

  // update: async (id: string | number, data: Partial<SponsorshipPayload>) => {
  //   const response = await axios.put(`${BASE}/${id}`, data);
  //   return response.data as SponsorshipResponse | null;
  // },

  // remove: async (id: string | number) => {
  //   const response = await axios.delete(`${BASE}/${id}`);
  //   return response.data as null;
  // },
};
