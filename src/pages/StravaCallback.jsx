import React, { useEffect, useState } from "react";

const CLIENT_ID = "169003";
const CLIENT_SECRET = "f73957ebaa4dc5ffe0fd1785729a6ddd0e36daec";
const isLocalhost = window.location.hostname === "localhost";
const redirectUri = isLocalhost
  ? "http://localhost:3000/strava-callback"
  : "https://run-app.vercel.app/strava-callback"; // עדכן לכתובת שלך ב-Vercel

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
    setStatus("מחליף קוד ל-access_token...");
    fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    })
      .then((res) => {
        console.log("Strava token response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Strava token response data:", data);
        if (data.access_token) {
          setStatus("התחברת בהצלחה! טוען נתוני ריצה...");
          localStorage.setItem("strava_access_token", data.access_token);
          window.location.href = "/dashboard";
        } else {
          setError("שגיאה בקבלת access_token: " + (data.message || JSON.stringify(data)));
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