export interface UserStats {
  joined: number;
  inProgress: number;
  completed: number;
  created: number;
}

export interface User {
  id: string;
  name: string;
  username: string;           // ← added
  email: string;
  status: number;             // ← added
  avatar: string | null;
  country: string | null;     // ← changed from country_code
  flag: string | null;        // ← added
  type: string;
  gender: string | null;
  age: number | null;         // ← added
  date_of_birth: string | null;
  created_at: string;
  stats: UserStats;           // ← added
}

export interface MeResponseBody {
  success?: boolean;
  message?: string;
  data?: User;                // no change, already correct
}

export interface LoginResponseBody {
  success?: boolean;
  message?: string;
  authorization?: {
    type?: string;
    access_token: string;
    refresh_token: string;
  };
  type?: string;              // ← "su_admin" comes at root level
}