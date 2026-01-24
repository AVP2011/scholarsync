"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrustTrendData {
  label: string;
  score: number;
}

export default function TrustTrendChart({ data }: { data: TrustTrendData[] }) {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Trust Score Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="label" stroke="#c7d2fe" />
          <YAxis domain={[0, 100]} stroke="#c7d2fe" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#facc15"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}