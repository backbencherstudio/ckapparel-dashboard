
import {
  GetQuotationsParams,
  QuotationsResponse,
  QuotationRequest,
  UpdateQuotationStatusPayload,
  ReplyQuotationPayload,
} from '@/types/quotation.types';
import axios from '@/lib/axios';

export const quotationService = {
  getQuotations: async (params?: GetQuotationsParams): Promise<QuotationsResponse> => {
    const response = await axios.get('/quotation', { params });
    const responseData = response.data;
    
    if (responseData.success && responseData.data && responseData.pagination) {
      return {
        items: responseData.data,
        total: responseData.pagination.total,
        page: responseData.pagination.page,
        limit: responseData.pagination.limit
      };
    }
    
    return responseData?.data || responseData;
  },

  getQuotationById: async (id: string): Promise<QuotationRequest> => {
    const response = await axios.get(`/quotation/${id}`);
    return response.data?.data || response.data;
  },

  updateQuotationStatus: async (id: string, payload: UpdateQuotationStatusPayload): Promise<any> => {
    const response = await axios.patch(`/quotation/${id}`, payload);
    return response.data;
  },

  replyToQuotation: async (id: string, payload: ReplyQuotationPayload): Promise<any> => {
    const formData = new FormData();
    formData.append('message', payload.message);
    if (payload.subject) formData.append('subject', payload.subject);
    if (payload.fullName) formData.append('fullName', payload.fullName);
    if (payload.email) formData.append('email', payload.email);
    if (payload.attachment) {
      formData.append('attachment', payload.attachment);
    }

    const response = await axios.post(`/quotation/${id}/reply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
