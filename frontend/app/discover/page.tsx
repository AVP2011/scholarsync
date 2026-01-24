"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchOpportunities } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";

import OpportunityCard from "@/components/OpportunityCard";
import TrustFilter from "@/components/TrustFilter";

interface Opportunity {
  id: string;
  title: string;
  company_name: string;
  apply_url: string;
  trust_score: number;
  trust_label: string;
}

export default function DiscoverPage() {
  const router = useRouter();

  const [trust, setTrust] = useState("");
  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 AUTH GUARD
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  // 📦 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const opportunities = await fetchOpportunities(trust);
        setData(opportunities);
      } catch (err) {
        console.error("Failed to load opportunities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trust]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Discover Opportunities</h1>
        <TrustFilter value={trust} onChange={setTrust} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading opportunities...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">
          No opportunities found for this filter.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((o) => (
            <OpportunityCard
              key={o.id}
              title={o.title}
              company={o.company_name}
              apply_url={o.apply_url}
              trust_score={o.trust_score}
              trust_label={o.trust_label}
            />
          ))}
        </div>
      )}
    </main>
  );
}