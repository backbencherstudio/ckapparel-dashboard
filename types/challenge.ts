export type Challenge = {
  name: string;
  description: string;
  category: "Elite" | "Monthly" | "Virtual" | "Community";
  difficulty: "hard" | "medium" | "easy";
  participants: number;
  createdBy: string;
  status: "Active" | "Pending";
};
