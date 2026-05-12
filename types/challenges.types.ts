export interface Metric {
  metric_type: string;
  sequence: number;
  target_value: number;
  min_threshold?: number;
  is_required: boolean;
}

export interface Checkpoint {
  sequence: number;
  title: string;
  display_name?: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
  metric_targets: Record<string, number>;
  is_visible: boolean;
  is_required: boolean;
  unlock_after_checkpoint_seq: number | null;
}

export interface MonthlyConfig {
  challenge_kind: string;
  monthly_reset: boolean;
  metadata: {
    month_name: string;
  };
}

export interface VirtualConfig {
  route_name: string;
  route_distance_km: number;
  require_gps: boolean;
  enable_journey_log: boolean;
  route_points: {
    route_start: { lat: number; lng: number };
    route_end: { lat: number; lng: number };
    waypoints: Array<{ lat: number; lng: number; name: string }>;
  };
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING' | 'EXPERT' | 'EXTREME';
  participants: number;
  createdBy: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'REJECTED';
  require_device_connection?: boolean;
  allow_manual_submission?: boolean;
  enable_chat?: boolean;
  is_active?: boolean;
  is_featured?: boolean;
  max_participants?: number;
  reward_title?: string;
  reward_description?: string;
  challenge_country?: string;
  monthly_config?: MonthlyConfig;
  virtual_config?: VirtualConfig;
  metrics?: Metric[];
  checkpoints?: Checkpoint[];
  actions: {
    edit: string;
    delete: string;
  };
}

export interface ChallengesResponse {
  total: number;
  page: number;
  limit: number;
  items: Challenge[];
}

export interface GetChallengesParams {
  page?: number;
  limit?: number;
  status?: string;
  difficulty?: string;
  category?: string;
  path?: string;
  search?: string;
}

export type CreateChallengePayload = Partial<Omit<Challenge, 'id' | 'participants' | 'createdBy' | 'actions'>>;

export interface RoutePlan {
  id: string;
  challenge_id: string;
  name?: string;
  description?: string;
  route_points?: any[];
  distance_km?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export type CreateRoutePlanPayload = Partial<Omit<RoutePlan, 'id' | 'created_at' | 'updated_at'>>;

export interface RoutePlansResponse {
  total: number;
  page: number;
  limit: number;
  items: RoutePlan[];
}

export interface GetRoutePlansParams {
  page?: number;
  limit?: number;
  challenge_id?: string;
  search?: string;
}
