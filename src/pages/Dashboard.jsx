import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import StravaConnectButton from "../components/StravaConnectButton";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("strava_access_token");
    if (!token) {
      setRuns([]);
      return;
    }
    setLoading(true);
    fetch("https://www.strava.com/api/v3/athlete/activities?per_page=20", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // סנן רק ריצות
          const runsOnly = data.filter((a) => a.type === "Run").slice(0, 10);
          setRuns(
            runsOnly.map((run) => ({
              id: run.id,
              date: run.start_date_local?.slice(0, 10) || run.start_date?.slice(0, 10),
              distance: (run.distance / 1000).toFixed(2),
              time: formatTime(run.moving_time),
            }))
          );
        } else {
          setError("שגיאה בשליפת נתונים מ-Strava");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("שגיאה: " + err.message);
        setLoading(false);
      });
  }, []);

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h > 0 ? h : null, m, s]
      .filter((v) => v !== null)
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  }

  const labels = runs.map((r) => r.date);
  const distances = runs.map((r) => Number(r.distance));

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

  const token = localStorage.getItem("strava_access_token");

  if (!token) {
    // לא מחובר — הצג כפתור התחברות בלבד
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Weekly Progress</h2>
        <p>כדי לראות את הריצות שלך, התחבר ל-Strava:</p>
        <StravaConnectButton />
      </div>
    );
  }

  if (loading) return <div>טוען נתונים מ-Strava...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Progress (Strava)</h2>
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