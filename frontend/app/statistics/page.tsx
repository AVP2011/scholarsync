"use client";

import { useEffect, useState } from "react";
import { fetchStats } from "@/lib/api";
import StatsCard from "@/components/StatsCard";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

type Stats = {
  total_opportunities: number;
  high_trust: number;
  medium_trust: number;
  low_trust: number;
  top_companies: { company: string; count: number }[];
};

export default function StatisticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // 🔒 AUTH GUARD
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Platform Statistics</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Platform Statistics</h1>
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!stats) return null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Platform Statistics</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatsCard
          title="Total Opportunities"
          value={stats.total_opportunities || 0}
          color="blue"
        />
        <StatsCard
          title="High Trust"
          value={stats.high_trust || 0}
          description="Score 70-100"
          color="green"
        />
        <StatsCard
          title="Medium Trust"
          value={stats.medium_trust || 0}
          description="Score 40-69"
          color="yellow"
        />
        <StatsCard
          title="Low Trust"
          value={stats.low_trust || 0}
          description="Score 0-39"
          color="red"
        />
      </div>

      {/* Top Companies */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Top Companies</h2>
        {stats.top_companies.length > 0 ? (
          <ul className="space-y-2">
            {stats.top_companies.map((c) => (
              <li
                key={c.company}
                className="flex justify-between items-center border-b last:border-none pb-2"
              >
                <span className="font-medium">{c.company}</span>
                <span className="text-gray-600">{c.count} opportunities</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No top companies available.</p>
        )}
      </div>
    </main>
  );
}
