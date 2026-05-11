import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sponsorshipService } from "@/services/sponsorship.service";
import { dashboardService } from "@/services/dashboard.service";
import { buildApiParams } from "@/lib/utils";
import { toast } from "react-hot-toast";

const KEY = ["sponsorship"];

/** Fetch all sponsorships */
export const useGetSponsorshipHubSummary = () =>
  useQuery({ queryKey: KEY, queryFn: () => sponsorshipService.getSponsorshipHubSummary() });


// NEW: Pending sponsorships hook
export const usePendingSponsorships = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [...KEY, "pending-sponsorships", params],
    queryFn: () => sponsorshipService.getPendingSponsorships(buildApiParams(params)),
    staleTime: 5 * 60 * 1000,
  });
};

// NEW: Active listings hook
export const useActiveListings = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: [...KEY, "active-listings", params],
    queryFn: () => sponsorshipService.getActiveListings(buildApiParams(params)),
    staleTime: 5 * 60 * 1000,
  });
}

// NEW: Update sponsorship status mutation
export const useUpdateSponsorshipStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      sponsorshipService.updateSponsorshipStatus(id, status),
    onSuccess: () => {
      // Invalidate relevant queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: [...KEY, "active-listings"] });
      queryClient.invalidateQueries({ queryKey: [...KEY, "pending-sponsorships"] });
      toast.success("Sponsorship status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update sponsorship status");
    },
  });
}

// NEW: Delete sponsorship mutation
export const useDeleteSponsorship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sponsorshipService.deleteSponsorship(id),
    onSuccess: () => {
      // Invalidate relevant queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: [...KEY, "active-listings"] });
      queryClient.invalidateQueries({ queryKey: [...KEY, "pending-sponsorships"] });
      toast.success("Sponsorship deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete sponsorship");
    },
  });
}


// NEW: Get sponsorship by id

export const useSponsorshipDetail = (id: string) => {
  return useQuery({
    queryKey: ['sponsorship-detail', id],
    queryFn: () => sponsorshipService.getSponsorshipDetail(id),
    enabled: !!id, // Only fetch if id exists
    staleTime: 5 * 60 * 1000,
  });
}

// /** Fetch a single sponsorship by id */
// export const useGetSponsorshipById = (id: string | number) =>
//   useQuery({
//     queryKey: [...KEY, id],
//     queryFn: () => sponsorshipService.getById(id),
//     enabled: !!id,
//   });

// /** Create a new sponsorship */
// export const useCreateSponsorship = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (data: SponsorshipPayload) => sponsorshipService.create(data),
//     onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
//   });
// };

// /** Update an existing sponsorship */
// export const useUpdateSponsorship = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       id,
//       data,
//     }: {
//       id: string | number;
//       data: Partial<SponsorshipPayload>;
//     }) => sponsorshipService.update(id, data),
//     onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
//   });
// };

// /** Delete a sponsorship */
// export const useDeleteSponsorship = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string | number) => sponsorshipService.remove(id),
//     onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
//   });
// };
