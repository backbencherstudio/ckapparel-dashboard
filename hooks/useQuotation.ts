import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotationService } from '@/services/quotation.service';
import { GetQuotationsParams, UpdateQuotationStatusPayload, ReplyQuotationPayload } from '@/types/quotation.types';

const QUOTATION_KEYS = {
  all: ['quotations'] as const,
  lists: () => [...QUOTATION_KEYS.all, 'list'] as const,
  list: (filters: GetQuotationsParams) => [...QUOTATION_KEYS.lists(), { filters }] as const,
  details: () => [...QUOTATION_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QUOTATION_KEYS.details(), id] as const,
};

export const useGetQuotations = (params: GetQuotationsParams) => {
  return useQuery({
    queryKey: QUOTATION_KEYS.list(params),
    queryFn: () => quotationService.getQuotations(params),
  });
};

export const useGetQuotationById = (id: string) => {
  return useQuery({
    queryKey: QUOTATION_KEYS.detail(id),
    queryFn: () => quotationService.getQuotationById(id),
    enabled: !!id,
  });
};

export const useUpdateQuotationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateQuotationStatusPayload }) => 
      quotationService.updateQuotationStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTATION_KEYS.lists() });
    },
  });
};

export const useReplyToQuotation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ReplyQuotationPayload }) =>
      quotationService.replyToQuotation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTATION_KEYS.lists() });
    },
  });
};
