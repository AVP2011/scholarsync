 // components/StatsCard.tsx
import React from 'react';

type StatsCardProps = {
  title: string;
  value: number | string;
  description?: string;
  trend?: string; // e.g. "↑ 15% from last month"
  color?: 'green' | 'yellow' | 'red' | 'blue';
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, trend, color = 'blue' }) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend && (
          <span className="text-xs text-gray-500">{trend}</span>
        )}
      </div>
      {description && (
        <p className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
