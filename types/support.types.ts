// NEW: Plan types
export interface PlanType {
  id: string;
  name: string;
  description: string;
}

export interface PlanTypesResponse {
  success: boolean;
  message: string;
  data: PlanType[];
}


// NEW: Support plan dashboard cards types
export interface SupportPlanCard {
  value: number;
  weeklyChange: number;
}

export interface SupportPlanDashboardData {
  totalSupportPlans: SupportPlanCard;
  activePlans: SupportPlanCard;
  totalChallenges: SupportPlanCard;
  activeChallenges: SupportPlanCard;
}

export interface SupportPlanDashboardResponse {
  success: boolean;
  message: string;
  data: SupportPlanDashboardData;
}

// NEW: Support plan types
export interface PlanType {
  id: string;
  name: string;
}

export interface SupportPlanStatus {
  value: number;
  isActive: boolean;
}

export interface SupportPlanResource {
  url: string;
  name: string;
  type: string;
}

export interface SupportPlanRoute {
  url: string | null;
  isAvailable: boolean;
}

export interface SupportPlanDownload {
  downloadedUsers: number;
  totalUsers: number;
  label: string;
}

export interface SupportPlan {
  id: string;
  title: string;
  planType: PlanType;
  status: SupportPlanStatus;
  uploadDate: string;
  category: string;
  resource: SupportPlanResource;
  route: SupportPlanRoute;
  download: SupportPlanDownload;
}

export interface SupportPlansMeta {
  total: number;
  filters: {
    planTypeId: string;
    category: string;
    status: number;
  };
}

export interface SupportPlansResponse {
  success: boolean;
  message: string;
  data: SupportPlan[];
  meta: SupportPlansMeta;
}


// NEW: Create support plan types
export interface CreateSupportPlanRequest {
  planTypeId: string;
  category: string;
  title: string;
  description: string;
  distance?: number;
  resource_url?: string | File;
  route_url?: string;
  trainingPlansCategory?: string;
}

export interface CreateSupportPlanResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    status: number;
    title: string;
    description: string;
    distance: string;
    resource_url: string | null;
    route_url: string | null;
    planTypeId: string;
    category: string;
    trainingPlansCategory: string | null;
    plan_type: {
      id: string;
      name: string;
    };
  };
}