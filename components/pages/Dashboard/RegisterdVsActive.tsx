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

const data = [
  { name: "Apr", registered: 65, active: 25 },
  { name: "May", registered: 80, active: 50 },
  { name: "Jun", registered: 75, active: 55 },
  { name: "Jul", registered: 68, active: 28 },
  { name: "Aug", registered: 30, active: 20 },
  { name: "Sep", registered: 80, active: 40 },
];

export default function RegisteredVsActive() {
  return (
    <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl ">
      
      <CardContent className="px-[20px] px-">
        
        {/* HEADER */}
        <div className="flex items-center justify-between ">
          <div>
          <h3 className="self-stretch text-white  text-lg font-semibold leading-[150%]">
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
          <Select defaultValue="6m">
            <SelectTrigger className="w-[140px] bg-transparent border border-white/20 text-white outline-none focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Last 6 month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">Last 6 month</SelectItem>
              <SelectItem value="3m">Last 3 month</SelectItem>
              <SelectItem value="1y">Last 1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CHART */}
        <div className="h-[260px] mt-4 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                stroke="#6B7280"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
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
                fill="#FFFFFF"
                radius={[6, 6, 0, 0]}
                barSize={12}
              />

              {/* ACTIVE */}
              <Bar
                dataKey="active"
                fill="#F6D642"
                radius={[6, 6, 0, 0]}
                barSize={12}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </CardContent>
    </Card>
  );
}


const CustomTooltip = ({ active, payload }: { active: boolean, payload: any[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2C2F33] px-3 py-2 rounded-lg text-sm text-white">
          <p>Registered: {payload[0].value}</p>
          <p>Active: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };