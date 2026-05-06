"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { useChallengeParticipants } from "@/hooks/useDashboard";

// Color mapping for different challenge types
const getChallengeColor = (key: string): string => {
  const colors: Record<string, string> = {
    ELITE_ATHLETE: "#7C3AED",    // Purple
    MONTHLY_CHALLENGE: "#16A34A", // Green
    VIRTUAL_ADVENTURE: "#38BDF8", // Blue
    COMMUNITY_CHALLENGE: "#2C2F33", // Dark gray
  };
  return colors[key] || "#6B7280";
};

export default function ChallengeParticipantsChart() {
  const { data, isLoading, error } = useChallengeParticipants();
  
  const chartData = data?.data?.breakdown.map(item => ({
    name: item.label,
    value: item.percentage,
    key: item.key,
    participants: item.participants,
    color: getChallengeColor(item.key),
  })) || [];

  const overallPercent = data?.data?.overallParticipationPercent || 0;
  const overallParticipants = data?.data?.overallParticipants || 0;

  if (isLoading) {
    return (
      <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl min-h-[366px]">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-[260px] bg-gray-700/20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#161616] border border-red-500/30 rounded-xl min-h-[366px]">
        <CardContent className="p-6">
          <div className="text-red-500 text-center">
            <p>Error loading challenge participants data</p>
            <p className="text-sm text-gray-400 mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl min-h-[366px]">
      <CardContent className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="self-stretch text-white text-lg font-semibold leading-[150%]">
            Total Challenges participants
          </h3>

          <button className="text-neutral-400">⋮</button>
        </div>

        {/* CHART */}
        <div className="relative h-[260px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={90}
                  outerRadius={110}
                  paddingAngle={5}
                  cornerRadius={5}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-neutral-400 text-sm">
              Overall participants
            </p>
            <p className="text-white text-3xl font-semibold">
              {overallPercent}%
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              ({overallParticipants} total)
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="mt-6 space-y-3">
          {chartData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-md"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-neutral-300">
                  {item.name}
                </span>
              </div>

              <span className="text-white font-medium">
                {item.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}