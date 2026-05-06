import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supportService } from "@/services/support.service";
import { queryKeys } from "@/lib/constants/query-keys";
import { CreateSupportPlanRequest } from "@/types/support.types";
import toast from "react-hot-toast";


const KEY = ["support"];

/** Fetch support plan types */
export const useGetSupportPlansTypes = () =>
  useQuery({
    queryKey: [...KEY, "plan-types"],
    queryFn: () => supportService.getSupportPlansTypes(),
    select: (response) =>
      response.data.map((type) => ({
        label: type.name,
        value: type.id,
      })),
  });

/** Fetch support plan dashboard cards */
export const useGetSupportPlanDashboardCards = () =>
  useQuery({
    queryKey: KEY,
    queryFn: () => supportService.getSupportPlanDashboardCards(),
  });

/** Fetch support plans */
export const useGetSupportPlans = (params?: {
  planTypeId?: string;
  category?: string;
  status?: number;
  page?: number;
  limit?: number;
}) =>
  useQuery({ queryKey: [...KEY, "plans"], queryFn: () => supportService.getSupportPlans(params) });


// NEW: Create support plan mutation
export const useCreateSupportPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupportPlanRequest) =>
      supportService.createSupportPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, "plans"] });
    },
  });
};  

export const useUpdateSupportPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateSupportPlanRequest }) =>
      supportService.updateSupportPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, "plans"] });
    },
  });
};


// NEW: Delete support plan mutation
export const useDeleteSupportPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => supportService.deleteSupportPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, "plans"] });
      toast.success('Support plan deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete support plan');
    },
  });
};

// NEW: Support plan status update mutation
export const useSupportPlanStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => supportService.getSupportPlanStatusUpdate(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...KEY, "plans"] });
      toast.success('Support plan status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update support plan status');
    },
  });
};