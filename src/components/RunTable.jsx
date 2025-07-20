import React from "react";
import PropTypes from "prop-types";

export default function RunTable({ runs }) {
  if (!runs.length) return null;

  return (
    <table className="mt-6 w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Distance (km)</th>
          <th className="p-2 border">Time</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr key={run.id} className="text-center">
            <td className="border p-2">{run.date}</td>
            <td className="border p-2">{run.distance.toFixed(2)}</td>
            <td className="border p-2">{run.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

RunTable.propTypes = {
  runs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};