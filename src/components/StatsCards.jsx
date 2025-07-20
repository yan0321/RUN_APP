import React from "react";
import { formatDistance, formatPace } from "../utils/formatters";

const StatCard = ({ title, value, unit, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-full border ${colorClasses[color]}`}>
          <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
        </div>
      </div>
    </div>
  );
};

const StatsCards = ({ statistics, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Distance"
        value={formatDistance(statistics.totalDistance)}
        unit="km"
        icon="🏃‍♂️"
        color="blue"
      />
      <StatCard
        title="Total Runs"
        value={statistics.totalRuns}
        icon="📊"
        color="green"
      />
      <StatCard
        title="Average Distance"
        value={formatDistance(statistics.averageDistance)}
        unit="km"
        icon="📏"
        color="purple"
      />
      <StatCard
        title="Average Pace"
        value={formatPace(statistics.averagePace)}
        unit="/km"
        icon="⏱️"
        color="orange"
      />
    </div>
  );
};

export default StatsCards;