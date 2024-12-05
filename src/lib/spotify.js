async function getSpotifyToken() {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify credentials in environment variables");
    }

    console.log("Client ID:", clientId); // Debugging
    console.log("Client Secret:", clientSecret); // Debugging

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    console.log("Token Fetch Response Status:", response.status); // Debugging

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Token Fetch Error Text:", errorText);
      throw new Error(`Failed to fetch token: ${errorText}`);
    }

    const data = await response.json();
    console.log("Fetched Token:", data.access_token); // Debugging

    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error.message);
    throw new Error("Failed to fetch Spotify token");
  }
}

module.exports = { getSpotifyToken };
console.log("Client ID:", process.env.SPOTIFY_CLIENT_ID);
console.log("Client Secret:", process.env.SPOTIFY_CLIENT_SECRET);
