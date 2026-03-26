"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "Monthly", value: 80.02, color: "#7C3AED" },
  { name: "Virtual", value: 24.53, color: "#16A34A" },
  { name: "Community", value: 16.47, color: "#38BDF8" },
  { name: "Elite", value: 16.47, color: "#2C2F33" },
];

const total = 92;

export default function ChallengeParticipantsChart() {
  return (
    <Card className="bg-[#161616] border border-[#FFFFFF1A] rounded-xl min-h-[366px]">
      <CardContent className="">

        {/* HEADER */}
        <div className="flex justify-between items-center ">
          <h3 className="self-stretch text-white  text-lg font-semibold leading-[150%]">
            Total Challenges participants
          </h3>

          <button className="text-neutral-400">⋮</button>
        </div>

        {/* CHART */}
        <div className="relative h-[260px] ">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                innerRadius={90}
                outerRadius={110}
                paddingAngle={5}
                cornerRadius={5}
                // fill="#8884d8"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center ">
            <p className="text-neutral-400 text-sm">
              Overall participants
            </p>
            <p className="text-white text-3xl font-semibold">
              {total}%
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="-mt-20 space-y-3 ">
          {data.map((item, i) => (
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
                  {item.name} Challenges
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