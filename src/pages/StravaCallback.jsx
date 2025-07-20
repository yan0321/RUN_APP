import React, { useEffect, useState } from "react";

const CLIENT_ID = "169003";
const isLocalhost = window.location.hostname === "localhost";
const redirectUri = isLocalhost
  ? "http://localhost:3000/strava-callback"
  : "https://run-app-flax.vercel.app/strava-callback";

export default function StravaCallback() {
  const [status, setStatus] = useState("טוען...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setError("לא התקבל קוד הרשאה מ-Strava. ודא שאישרת את ההרשאות.");
      console.error("No code in URL params", window.location.search);
      return;
    }
    setStatus("מחליף קוד ל-access_token (דרך השרת)...");
    fetch("/api/strava-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Serverless token response:", data);
        if (data.access_token) {
          setStatus("התחברת בהצלחה! טוען נתוני ריצה...");
          localStorage.setItem("strava_access_token", data.access_token);
          window.location.href = "/dashboard";
        } else {
          setError("שגיאה בקבלת access_token: " + (data.error || JSON.stringify(data.details)));
        }
      })
      .catch((err) => {
        setError("שגיאה: " + err.message);
        console.error("Token exchange error:", err);
      });
  }, []);

  if (error) return <div style={{color: 'red', fontWeight: 'bold'}}>{error}</div>;
  if (status) return <div>{status}</div>;
  return <div>לא נטען כלום. בדוק את ה-console.</div>;
} 