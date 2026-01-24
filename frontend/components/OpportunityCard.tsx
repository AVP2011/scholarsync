// components/OpportunityCard.tsx
import React from "react";
import TrustBadge from "./TrustBadge";
import { ExternalLink } from "lucide-react";

type OpportunityProps = {
  title: string;
  company: string;
  trust_score: number;
  trust_label: string;
  apply_url: string;
};

const OpportunityCard: React.FC<OpportunityProps> = ({
  title,
  company,
  trust_score,
  trust_label,
  apply_url,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2 border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <TrustBadge score={trust_score} />
      </div>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-xs text-gray-500 italic">{trust_label}</p>

      <a
        href={apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        <ExternalLink className="w-4 h-4" />
        Apply Now
      </a>
    </div>
  );
};

export default OpportunityCard;
