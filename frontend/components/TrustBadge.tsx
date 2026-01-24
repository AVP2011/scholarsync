// components/TrustBadge.tsx
import React from 'react';

type TrustBadgeProps = {
  score: number;
};

const TrustBadge: React.FC<TrustBadgeProps> = ({ score }) => {
  let label = '';
  let color = '';
  let icon = '';

  if (score >= 70) {
    label = 'High Trust';
    color = 'bg-green-100 text-green-800';
    icon = '✅';
  } else if (score >= 40) {
    label = 'Medium Trust';
    color = 'bg-yellow-100 text-yellow-800';
    icon = '🟡';
  } else {
    label = 'Low Trust';
    color = 'bg-red-100 text-red-800';
    icon = '⚠️';
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold ${color}`}>
      {icon} {label}
    </span>
  );
};

export default TrustBadge;
