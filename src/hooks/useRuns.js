import { useEffect, useState } from "react";
import sampleRuns from "../sampleRuns.json";

export default function useRuns() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    // Simulate an API call – replace with real fetch when backend is ready
    setRuns(sampleRuns);
  }, []);

  return runs;
}