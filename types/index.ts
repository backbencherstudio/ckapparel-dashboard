// types/index.ts

export type BadgeVariant =
  | "Main Event"
  | "Benchmark"
  | "Hard"
  | "Challenging"
  | "Medium"
  | "Easy"
  | "Active"
  | "Inactive"
  | "Banned";

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: "Main Event" | "Benchmark";
  difficulty: "Easy" | "Medium" | "Challenging" | "Hard";
  participants: number;
  reward: string;
  status: "Active" | "Inactive";
}

export interface Athlete {
  id: string;
  name: string;
  handle: string;
  country: string;
  challenges: number;
  joined: string;
  status: "Active" | "Banned";
  avatarUrl?: string;
}

export interface ColumnDef<TData> {
  id?: string;
  accessorKey?: keyof TData;
  header: string;
  size?: number;
  cell?: (props: { row: TData; value: unknown }) => React.ReactNode;
}

export interface FilterOption {
  key: string;
  filterKey?: string;
  label: string;
  options: string[];
}