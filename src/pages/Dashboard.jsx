import React from "react";
import useRuns from "../hooks/useRuns";
import RunChart from "../components/RunChart";
import RunTable from "../components/RunTable";

export default function Dashboard() {
  const runs = useRuns();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Progress</h2>
      <RunChart runs={runs} />
      <RunTable runs={runs} />
    </div>
  );
} 