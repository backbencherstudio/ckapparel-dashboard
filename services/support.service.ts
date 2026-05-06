import axios from "@/lib/axios";
import type { CreateSupportPlanRequest, CreateSupportPlanResponse, PlanTypesResponse, SupportPlanDashboardResponse, SupportPlansResponse } from "@/types/support.types";

const BASE = "/admin/support-plan";

export const supportService = {

  getSupportPlansTypes: async () => {
    const response = await axios.get(`${BASE}/plan-types`);
    return response.data as PlanTypesResponse;
  },

  // NEW: Get support plan dashboard cards
  getSupportPlanDashboardCards: async () => {
    const response = await axios.get(`${BASE}/dashboard-cards`);
    return response.data as SupportPlanDashboardResponse;
  },

  // NEW: Get support plans
  getSupportPlans: async (params?: {
    planTypeId?: string;
    category?: string;
    status?: number;
    page?: number;
    limit?: number;
  }) => {
    const response = await axios.get(`${BASE}/cards`, { params });
    return response.data as SupportPlansResponse;
  },


  // NEW: Create support plan
  createSupportPlan: async (data: CreateSupportPlanRequest) => {
    const formData = new FormData();
    formData.append('planTypeId', data.planTypeId);
    formData.append('category', data.category);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.distance) formData.append('distance', data.distance.toString());
    if (data.resource_url) formData.append('resource_url', data.resource_url);
    if (data.route_url) formData.append('route_url', data.route_url);
    if (data.trainingPlansCategory) formData.append('trainingPlansCategory', data.trainingPlansCategory);

    const response = await axios.post("/admin/support-plan", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as CreateSupportPlanResponse;
  },

  // NEW: Update support plan
  updateSupportPlan: async (id: string, data: CreateSupportPlanRequest) => {
    const formData = new FormData();
    formData.append('planTypeId', data.planTypeId);
    formData.append('category', data.category);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.distance) formData.append('distance', data.distance.toString());
    if (data.resource_url) formData.append('resource_url', data.resource_url);
    if (data.route_url) formData.append('route_url', data.route_url);
    if (data.trainingPlansCategory) formData.append('trainingPlansCategory', data.trainingPlansCategory);

    const response = await axios.patch(`${BASE}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as CreateSupportPlanResponse;
  },

  // NEW: Delete support plan
  deleteSupportPlan: async (id: string) => {
    const response = await axios.delete(`${BASE}/${id}`);
    return response.data as null;
  },

  // NEW: Get support plan Status update
  getSupportPlanStatusUpdate: async (id: string, status: boolean) => {
    const response = await axios.patch(`${BASE}/${id}/status`, {
      status: status,
    });
    return response.data;
  }

};
