export interface QuotationRequest {
  id: string;
  user_name?: string;
  email?: string;
  user_email?: string;
  avatar?: string;
  challenge_title: string;
  support_needed: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'completed';
  created_at?: string;
}

export interface QuotationsResponse {
  total: number;
  page: number;
  limit: number;
  items: QuotationRequest[];
}

export interface GetQuotationsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface UpdateQuotationStatusPayload {
  status: 'pending' | 'reviewed' | 'contacted' | 'completed';
}

export interface ReplyQuotationPayload {
  message: string;
  subject?: string;
  fullName?: string;
  email?: string;
  attachment?: File;
}
