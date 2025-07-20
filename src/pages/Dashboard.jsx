import React from "react";
import useRuns from "../hooks/useRuns";
import StatsCards from "../components/StatsCards";
import RunChart from "../components/RunChart";
import RunTable from "../components/RunTable";

const Dashboard = () => {
  const { runs, loading, error, statistics, chartData, refetch } = useRuns();

  // Error state
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-4">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Running Dashboard
        </h1>
        <p className="text-gray-600">
          Track your running progress and analyze your performance
        </p>
      </div>

      {/* Statistics Cards */}
      <StatsCards statistics={statistics} loading={loading} />

      {/* Chart Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Progress Chart
          </h2>
          {!loading && runs.length > 0 && (
            <button
              onClick={refetch}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
              title="Refresh data"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          )}
        </div>
        <RunChart data={chartData} loading={loading} />
      </div>

      {/* Table Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Runs
          </h2>
          {!loading && runs.length > 0 && (
            <div className="text-sm text-gray-500">
              {runs.length} run{runs.length !== 1 ? 's' : ''} recorded
            </div>
          )}
        </div>
        <RunTable runs={runs} loading={loading} />
      </div>

      {/* Empty State when no data and not loading */}
      {!loading && runs.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Welcome to your Running Dashboard!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start tracking your runs to see your progress, statistics, and performance over time.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Add Your First Run
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 