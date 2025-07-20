import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import sampleRuns from "../sampleRuns.json";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    // simulate API call
    setRuns(sampleRuns);
  }, []);

  const labels = runs.map((r) => r.date);
  const distances = runs.map((r) => r.distance);

  const data = {
    labels,
    datasets: [
      {
        label: "Distance (km)",
        data: distances,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Progress (mock)</h2>
      <Bar data={data} />
      <table className="mt-6 w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Distance (km)</th>
            <th className="p-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="text-center">
              <td className="border p-2">{run.date}</td>
              <td className="border p-2">{run.distance}</td>
              <td className="border p-2">{run.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 