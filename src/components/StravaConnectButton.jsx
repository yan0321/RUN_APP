import React from "react";

const StravaConnectButton = () => {
  const handleConnect = () => {
    const clientId = "169003";
    const redirectUri = "http://localhost:3000/strava-callback";
    const responseType = "code";
    const scope = "read,activity:read_all";
    const approvalPrompt = "auto";

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&approval_prompt=${approvalPrompt}`;

    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleConnect}
      style={{
        backgroundColor: "#fc4c02",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Connect to Strava
    </button>
  );
};

export default StravaConnectButton; 