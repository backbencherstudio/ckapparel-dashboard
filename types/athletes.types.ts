// NEW: Admin user types
export interface Athletes {
  id: string;
  status: number;
  name: string;
  username: string | null;
  email: string;
  avatar: string | null;
  country: string | null;
  flag: string | null;
  type: 'user' | 'su_admin' | 'admin';
  created_at: string;
  updated_at: string;
  challenges_joined: number;
}

export interface AthletesResponse {
  success: boolean;
  data: Athletes[];
}


export interface AthletesPayload {
  status: number;
  name: string;
  username: string | null;
  email: string;
  avatar: string | null;
  country: string | null;
  flag: string | null;
  type: 'user' | 'su_admin' | 'admin';
}


// NEW: Single user details type
export interface AthletesDetails {
  id: string;
  status: number;
  name: string;
  username: string | null;
  email: string;
  avatar: string | null;
  country: string | null;
  flag: string | null;
  age: number | null;
  type: 'user' | 'su_admin' | 'admin';
  created_at: string;
  updated_at: string;
  challenges_joined: number;
  challenges_completed: number;
  challenges_incomplete: number;
}

export interface AthletesDetailsResponse {
  success: boolean;
  data: AthletesDetails;
}