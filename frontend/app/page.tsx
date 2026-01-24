 "use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 text-center">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trust-Aware Opportunity Discovery
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Find scholarships, internships, and career opportunities you can trust.
          Every listing is scored for credibility so you can focus on what matters.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/discover"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Discover Opportunities
          </Link>
          <Link
            href="/statistics"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            View Statistics
          </Link>
        </div>
      </div>

      {/* Quick Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-2">🔒 Verified Listings</h3>
          <p className="text-gray-600 text-sm">
            Opportunities are scored with transparent trust metrics to reduce scams and misinformation.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-2">📊 Trust Insights</h3>
          <p className="text-gray-600 text-sm">
            Explore trust distribution, monthly trends, and top companies offering opportunities.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-2">🚀 Student Focused</h3>
          <p className="text-gray-600 text-sm">
            Built for students to confidently discover scholarships, internships, and research projects.
          </p>
        </div>
      </div>
    </main>
  );
}
