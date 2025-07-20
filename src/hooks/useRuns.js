import { useState, useEffect, useMemo } from "react";
import sampleRuns from "../sampleRuns.json";
import { calculatePace, formatDate } from "../utils/formatters";
import { CHART_COLORS, DATE_FORMATS } from "../utils/constants";

const useRuns = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Add validation and data enrichment
        const validatedRuns = sampleRuns.map(run => ({
          ...run,
          distance: Number(run.distance),
          date: new Date(run.date),
          pace: calculatePace(run.distance, run.time)
        }));
        
        setRuns(validatedRuns);
      } catch (err) {
        setError("Failed to fetch runs data");
        console.error("Error fetching runs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, []);

  // Computed statistics
  const statistics = useMemo(() => {
    if (runs.length === 0) return null;

    const totalDistance = runs.reduce((sum, run) => sum + run.distance, 0);
    const averageDistance = totalDistance / runs.length;
    const averagePace = runs.reduce((sum, run) => sum + run.pace, 0) / runs.length;
    const longestRun = Math.max(...runs.map(run => run.distance));
    const mostRecentRun = runs.reduce((latest, run) => 
      run.date > latest.date ? run : latest
    );

    return {
      totalDistance: Math.round(totalDistance * 100) / 100,
      averageDistance: Math.round(averageDistance * 100) / 100,
      averagePace: Math.round(averagePace * 100) / 100,
      longestRun,
      mostRecentRun,
      totalRuns: runs.length
    };
  }, [runs]);

  // Chart data
  const chartData = useMemo(() => {
    const sortedRuns = [...runs].sort((a, b) => a.date - b.date);
    
    return {
      labels: sortedRuns.map(run => formatDate(run.date, DATE_FORMATS.short)),
      datasets: [
        {
          label: "Distance (km)",
          data: sortedRuns.map(run => run.distance),
          backgroundColor: CHART_COLORS.primary,
          borderColor: CHART_COLORS.primaryBorder,
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    };
  }, [runs]);

  return {
    runs: runs.sort((a, b) => b.date - a.date), // Sort by date descending
    loading,
    error,
    statistics,
    chartData,
    refetch: () => {
      setRuns([]);
      setLoading(true);
      setError(null);
    }
  };
};

export default useRuns;