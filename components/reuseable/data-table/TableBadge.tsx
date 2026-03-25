type BadgeProps = {
  children: string;
};

export function TableBadge({ children }: BadgeProps) {
  const map: Record<string, string> = {
    Active: "bg-green-500/10 text-green-400 border border-green-500/30",
    Banned: "bg-red-500/10 text-red-400 border border-red-500/30",
    Hard: "bg-red-500/10 text-red-400 border border-red-500/30",
    Benchmark: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    "Main Event": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        map[children] || "bg-white/10 text-white"
      }`}
    >
      {children}
    </span>
  );
}