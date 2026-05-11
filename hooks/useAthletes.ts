  import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { athletesService } from "@/services/athletes.service";
import type { AthletesPayload } from "@/types/athletes.types";
import { queryKeys } from "@/lib/constants/query-keys";
import { toast } from "react-hot-toast";

/** Fetch all athletess */
export const useGetAthletes = () =>
  useQuery({ queryKey: queryKeys.athletes.list, queryFn: () => athletesService.getAthletes() });

/** Fetch a single athletes by id */
export const useGetAthletesById = (id: string | number) =>
  useQuery({
    queryKey: [...queryKeys.athletes.details, id],
    queryFn: () => athletesService.getAthletesById(id),
    enabled: !!id,
  });

/** Ban a single athletes by id */
export const useBanAthlete = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status?: number }) => 
      athletesService.banAthlete(id, status),
    onSuccess: (_, variables) => {
      toast.success("Athlete banned successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.athletes.list });
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.athletes.details, variables.id],
      });
    },
    onError: () => {
      toast.error("Failed to ban athlete");
    },  
  });
};



//   /** Update an existing athletes */
//   export const useUpdateAthletes = () => {
//     const qc = useQueryClient();
//     return useMutation({
//       mutationFn: ({
//         id,
//         data,
//       }: {
//         id: string | number;
//         data: Partial<AthletesPayload>;
//       }) => athletesService.update(id, data),
//       onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
//     });
//   };

// /** Delete a athletes */
// export const useDeleteAthletes = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string | number) => athletesService.remove(id),
//     onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
//   });
// };
