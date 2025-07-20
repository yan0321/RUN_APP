import React, { useEffect, useState } from "react";

const CLIENT_ID = "169003";
const CLIENT_SECRET = "f73957ebaa4dc5ffe0fd1785729a6ddd0e36daec";
const REDIRECT_URI = "http://localhost:3000/strava-callback";

export default function StravaCallback() {
  const [status, setStatus] = useState("טוען...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setError("לא התקבל קוד הרשאה מ-Strava");
      return;
    }
    // שלב 1: החלפת code ל-access_token
    fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setStatus("התחברת בהצלחה! טוען נתוני ריצה...");
          // שמור את ה-token בזיכרון (אפשר גם ב-localStorage)
          localStorage.setItem("strava_access_token", data.access_token);
          // הפנה לדשבורד
          window.location.href = "/dashboard";
        } else {
          setError("שגיאה בקבלת access_token: " + (data.message || JSON.stringify(data)));
        }
      })
      .catch((err) => setError("שגיאה: " + err.message));
  }, []);

  if (error) return <div style={{color: 'red'}}>{error}</div>;
  return <div>{status}</div>;
} 