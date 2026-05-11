// NEW: Challenge types
export interface ChallengeActions {
  edit: string;
  delete: string;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGING';
  participants: number;
  createdBy: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  actions: ChallengeActions;
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