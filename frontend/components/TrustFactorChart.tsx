"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Analysis {
  base: number;
  domain_signal: number;
  content: number;
  historical: number;
}

export default function TrustFactorChart({ analysis }: { analysis: Analysis }) {
  const data = [
    { name: "Base Trust", value: analysis.base },
    { name: "Domain", value: analysis.domain_signal },
    { name: "Content", value: analysis.content },
    { name: "Historical", value: analysis.historical },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-md font-semibold mb-4">Trust Signal Breakdown</h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}