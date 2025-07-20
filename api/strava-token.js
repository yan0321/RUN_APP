// Vercel Serverless Function: /api/strava-token.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, redirect_uri } = req.body;
  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing code or redirect_uri' });
  }

  const client_id = '169003';
  const client_secret = 'f73957ebaa4dc5ffe0fd1785729a6ddd0e36daec';

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        grant_type: 'authorization_code',
        redirect_uri,
      }),
    });
    const data = await response.json();
    if (data.access_token) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({ error: data.message || 'Failed to get access_token', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} 