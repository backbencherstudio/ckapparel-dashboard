"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAthletesTrend } from "@/hooks/useDashboard";
import { useState, useMemo } from "react";
import { MonthsRange, AthletesTrendDataPoint } from "@/types/dashboard.types";

// Transform API data to chart format
const transformChartData = (apiData: AthletesTrendDataPoint[] | undefined) => {
  if (!apiData || apiData.length === 0) return [];
  
  return apiData.map((item) => ({
    name: item.month,
    monthKey: item.monthKey,
    registered: item.registeredAthletes,
    active: item.activeAthletes,
  }));
};

// Calculate max value for Y-axis domain
const getMaxValue = (data: any[]) => {
  if (!data.length) return 100;
  const maxRegistered = Math.max(...data.map(d => d.registered), 0);
  const maxActive = Math.max(...data.map(d => d.active), 0);
  const maxValue = Math.max(maxRegistered, maxActive);
  // Round up to nearest 10 or 20 for better display
  return Math.ceil(maxValue / 10) * 10 || 100;
};

export default function RegisteredVsActive() {
  const [months, setMonths] = useState<MonthsRange>(6);
  const { data, isLoading, error } = useAthletesTrend(months);
  
  const chartData = useMemo(() => {
    return transformChartData(data?.data);
  }, [data?.data]);

  const maxValue = useMemo(() => {
    return getMaxValue(chartData);
  }, [chartData]);

  const handleMonthChange = (value: string) => {
    setMonths(value === "1y" ? 12 : 6);
  };

  // Get select value display
  const getSelectValue = () => {
    if (months === 6) return "6m";
    if (months === 12) return "1y";
    return "6m";
  };

  if (isLoading) {
    return (
      <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl">
        <CardContent className="px-[20px] py-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mb-6"></div>
            <div className="h-[260px] bg-gray-700/20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#161616] border border-red-500/30 rounded-xl">
        <CardContent className="px-[20px] py-6">
          <div className="text-red-500 text-center">
            <p>Error loading athletes trend data</p>
            <p className="text-sm text-gray-400 mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl">
      <CardContent className="px-[20px] py-5">
        
        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="self-stretch text-white text-lg font-semibold leading-[150%]">
              Registered vs Active Athletes
            </h3>

            {/* LEGEND */}
            <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-4 h-2 rounded-full bg-white shrink-0"></span>
                Registered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-2 rounded-full bg-[#F6D642] shrink-0"></span>
                Active Athletes
              </div>
            </div>
          </div>

          {/* FILTER */}
          <Select value={getSelectValue()} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[140px] bg-transparent border border-white/20 text-white outline-none focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Last 6 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last 1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CHART */}
        <div className="h-[260px] mt-4">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              No data available for the selected period
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={8}>
                
                <XAxis
                  dataKey="name"
                  stroke="#6B7280"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />

                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  domain={[0, maxValue]}
                  tickFormatter={(v) => `${v}`}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2C2F33",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  content={<CustomTooltip active={true} payload={[]} />}
                />

                {/* REGISTERED */}
                <Bar
                  dataKey="registered"
                  name="Registered Athletes"
                  fill="#FFFFFF"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />

                {/* ACTIVE */}
                <Bar
                  dataKey="active"
                  name="Active Athletes"
                  fill="#F6D642"
                  radius={[6, 6, 0, 0]}
                  barSize={12}
                />

              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Optional: Summary Stats */}
        {chartData.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-400">
            <div>
              Total Registered: {chartData.reduce((sum, d) => sum + d.registered, 0)}
            </div>
            <div>
              Total Active: {chartData.reduce((sum, d) => sum + d.active, 0)}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any[], label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2C2F33] px-3 py-2 rounded-lg text-sm text-white shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-white">Registered: <span className="font-medium">{payload[0]?.value || 0}</span></p>
        <p className="text-[#F6D642]">Active: <span className="font-medium">{payload[1]?.value || 0}</span></p>
      </div>
    );
  }
  return null;
};