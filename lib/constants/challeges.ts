// constants/challenge.ts
export const CHALLENGE_CATEGORY_OPTIONS = [
    { label: "All Categories", value: "all" },
    { label: "Running", value: "RUNNING" },
    { label: "Cycling", value: "CYCLING" },
    { label: "Swimming", value: "SWIMMING" },
    { label: "HIIT", value: "HIIT" },
    { label: "Other", value: "OTHER" },
  ] as const;
  
  export const CHALLENGE_DIFFICULTY_OPTIONS = [
    { label: "All Difficulty", value: "all" },
    { label: "Easy", value: "EASY" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Hard", value: "HARD" },
    { label: "Challenging", value: "CHALLENGING" },
    { label: "Expert", value: "EXPERT" },
    { label: "Extreme", value: "EXTREME" },
  ] as const;
  
  export const CHALLENGE_STATUS_OPTIONS = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "ACTIVE" },
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Rejected", value: "REJECTED" },
  ] as const;