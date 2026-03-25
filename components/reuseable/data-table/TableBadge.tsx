type BadgeProps = {
  children: React.ReactNode;
  variant?: string; // Add this line
};

export function TableBadge({ children, variant }: BadgeProps) {
  // Use variant if provided, otherwise fallback to children
  const key = variant || (typeof children === "string" ? children : "");

  const map: Record<string, string> = {
    Active: "border-[#22C55E] bg-[#22C55E1A] text-[#22C55E]",
    Banned: "border-red-500 bg-red-500/10 text-red-500",
    Hard: "border-red-500 bg-red-500/10 text-red-500",
    Benchmark: "border-blue-500 bg-blue-500/10 text-blue-500",
    Challenging: "border-blue-500 bg-blue-500/10 text-blue-500",
    "Main Event": "border-[#F6D642] bg-[#F6D6421A] text-[#F6D642]",
    "Virtual": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    "Community": "border-green-500 bg-green-500/10 text-green-500",
    "Elite": "border-purple-500 bg-purple-500/10 text-purple-500",
    "Monthly": "border-orange-500 bg-orange-500/10 text-orange-500",
    "Pending": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    "Medium": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    "Easy": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    "High": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    "Low": "border-yellow-500 bg-yellow-500/10 text-yellow-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-[32px] border border-solid text-sm font-medium leading-[150%] font-inter inline-block whitespace-nowrap ${map[key] || "border-white/30 bg-white/10 text-white"
        }`}
    >
      {children}
    </span>
  );
}