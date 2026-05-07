


// NEW: Sponsorship hub summary types
export interface SponsorshipHubItem {
  total: number;
  newThisWeek: number;
}

export interface SponsorshipHubSummaryData {
  openListing: SponsorshipHubItem;
  pendingRequests: SponsorshipHubItem;
  fullyCompleted: SponsorshipHubItem;
  totalRaised: number;
}

export interface SponsorshipHubSummaryResponse {
  success: boolean;
  message: string;
  data: SponsorshipHubSummaryData;
}

// NEW: Pending sponsorship review types
export interface PendingSponsorship {
  id: string;
  sponsorshipId: string;
  brandName: string;
  brandLogo: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  budget: number;
  currency: string;
  description: string;
  attachments: string[];
  submittedAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PendingSponsorshipMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  status: string;
  category: string | null;
  search: string | null;
}

export interface PendingSponsorshipResponse {
  success: boolean;
  message: string;
  data: PendingSponsorship[];
  meta: PendingSponsorshipMeta;
}


// NEW: Active listing types
export interface ActiveListing {
  id: string;
  sponsorshipId: string;
  brandName: string;
  brandLogo: string;
  category: string;
  budget: number;
  currency: string;
  description: string;
  requirements: string[];
  startDate: string;
  endDate: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActiveListingMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  status?: string;
  category?: string;
  search?: string;
}

export interface ActiveListingResponse {
  success: boolean;
  message: string;
  data: ActiveListing[];
  meta: ActiveListingMeta;
}

// NEW: Update sponsorship status types
export interface UpdateSponsorshipStatusRequest {
  status: 'OPEN' | 'CLOSED' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface UpdateSponsorshipStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    updatedAt: string;
  };
}


// NEW: Delete sponsorship types
export interface DeleteSponsorshipResponse {
  success: boolean;
  message: string;
  data: null;
}



// NEW: Sponsorship detail types
export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
}

export interface SponsorshipDetail {
  id: string;
  sponsorshipId: string;
  brandName: string;
  brandLogo: string;
  category: string;
  budget: number;
  currency: string;
  description: string;
  requirements: string[];
  startDate: string;
  endDate: string;
  status: string;
  applicationsCount: number;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  socialLinks?: SocialLinks;
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SponsorshipDetailResponse {
  success: boolean;
  message: string;
  data: SponsorshipDetail;
}