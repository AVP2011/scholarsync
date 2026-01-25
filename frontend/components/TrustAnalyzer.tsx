"use client";

import { useState } from "react";
import { analyzeTrust } from "@/lib/api";
import TrustBadge from "./TrustBadge";
import TrustTrendChart from "./TrustTrendChart";
import TrustFactorChart from "./TrustFactorChart";
type TrustTrendData = {
  label: string;
  score: number;
};

interface TrustResult {
  
  trust_score: number;
  source: string;
  analysis: {
    base: number;
    domain_signal: number;
    content: number;
    historical: number;
  };
  risk_flags?: string[];
  recommendations?: string[];
}

export default function TrustAnalyzer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<TrustResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await analyzeTrust(url);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DERIVED DATA (NO NEW API) ---------------- */

  const trendData: TrustTrendData[] = result
    ? [
        { label: "Base", score: result.analysis.base },
        {
          label: "After Domain",
          score: result.analysis.base + result.analysis.domain_signal,
        },
        {
          label: "After Content",
          score:
            result.analysis.base +
            result.analysis.domain_signal +
            result.analysis.content,
        },
        { label: "Final Score", score: result.trust_score },
      ]
    : [];

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm mb-10">
      <h2 className="text-xl font-bold mb-2">🔍 Analyze an Opportunity Link</h2>
      <p className="text-sm text-gray-600 mb-4">
        Paste any job, internship, or scholarship link to verify its trust
        score.
      </p>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/opportunity"
          className="flex-1 border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-6 border-t pt-6 space-y-6">
          {/* SCORE */}
          <div className="flex items-center gap-3">
            <TrustBadge score={result.trust_score} />
            <span className="font-semibold text-lg">
              {result.trust_score}/100
            </span>
          </div>

          {/* <p className="text-sm text-gray-700">Source: {result.source}</p>
          <div className="text-sm text-gray-600 mt-2">
            <p>Base Trust: {result.analysis.base}</p>
            <p>Domain Signal: {result.analysis.domain_signal}</p>
            <p>Content Heuristics: {result.analysis.content}</p>
            <p>Historical Adjustment: {result.analysis.historical}</p>
          </div> */}
          {result.recommendations && (
            <div className="mt-4 bg-gray-50 border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">🔎 Recommendations</h4>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {result.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrustTrendChart data={trendData} />
            <TrustFactorChart analysis={result.analysis} />
          </div>

          {/* EXPLANATION */}
          <p className="text-sm text-gray-700">Source: {result.source}</p>
          <div className="text-sm text-gray-600">
            <p>Base Trust: {result.analysis.base}</p>
            <p>Domain Signal: {result.analysis.domain_signal}</p>
            <p>Content Heuristics: {result.analysis.content}</p>
            <p>Historical Adjustment: {result.analysis.historical}</p>
          </div>
        </div>
      )}
    </div>
  );
}
