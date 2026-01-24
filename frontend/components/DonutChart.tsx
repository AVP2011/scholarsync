"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type DonutChartProps = {
  high: number;
  medium: number;
  low: number;
};

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function DonutChart({ high, medium, low }: DonutChartProps) {
  const data = [
    { name: "High Trust (70–100)", value: high },
    { name: "Medium Trust (40–69)", value: medium },
    { name: "Low Trust (0–39)", value: low },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Trust Distribution</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}