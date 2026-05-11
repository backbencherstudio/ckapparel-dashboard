// Existing types (keep these)
export interface WeeklyChange {
  delta: number;
  direction: 'up' | 'down' | 'flat';
  percentage: number;
}

export interface DashboardCard {
  value: number;
  weekly: WeeklyChange;
}

export interface DashboardSummaryData {
  totalAthletes: DashboardCard;
  activeChallenges: DashboardCard;
  openSponsorships: DashboardCard;
  quotationRequests: DashboardCard;
}

export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data: DashboardSummaryData;
}

// Athletes trend types
export interface AthletesTrendDataPoint {
  month: string;
  monthKey: string;
  registeredAthletes: number;
  activeAthletes: number;
}

export interface AthletesTrendResponse {
  success: boolean;
  message: string;
  data: AthletesTrendDataPoint[];
  meta: {
    months: number;
  };
}

export type MonthsRange = 6 | 12;

// NEW: Challenge participants types
export interface ChallengeBreakdownItem {
  key: string;
  label: string;
  participants: number;
  percentage: number;
}

export interface ChallengeParticipantsData {
  overallParticipants: number;
  overallParticipationPercent: number;
  breakdown: ChallengeBreakdownItem[];
}

export interface ChallengeParticipantsResponse {
  success: boolean;
  message: string;
  data: ChallengeParticipantsData;
}