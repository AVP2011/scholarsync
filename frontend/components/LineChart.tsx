"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", high: 8, medium: 3, low: 1 },
  { month: "Feb", high: 10, medium: 4, low: 2 },
  { month: "Mar", high: 14, medium: 5, low: 2 },
  { month: "Apr", high: 18, medium: 6, low: 3 },
  { month: "May", high: 22, medium: 7, low: 4 },
  { month: "Jun", high: 28, medium: 8, low: 5 },
];

export default function TrustLineChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">Monthly Trust Trends</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="high"
            stroke="#22c55e"
            strokeWidth={3}
            name="High Trust"
          />
          <Line
            type="monotone"
            dataKey="medium"
            stroke="#f59e0b"
            strokeWidth={3}
            name="Medium Trust"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#ef4444"
            strokeWidth={3}
            name="Low Trust"
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 mt-2">
        Sample trend based on recent opportunity ingestion
      </p>
    </div>
  );
}
