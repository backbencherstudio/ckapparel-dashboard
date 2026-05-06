export const queryKeys = {
    auth: {
      me: ["auth", "me"] as const,
    },
    dashboard: {
      cards: ["dashboard", "cards"] as const,
      athletesTrend: ["dashboard", "athletesTrend"] as const,
      challengeParticipants: ["dashboard", "challengeParticipants"] as const,
    },
  } as const;