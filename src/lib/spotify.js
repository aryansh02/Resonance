export async function getSpotifyTokens(code) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing Spotify credentials in environment variables.");
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch tokens: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    return tokenData;
  } catch (error) {
    console.error("Error fetching Spotify tokens:", error);
    throw new Error("Error fetching Spotify tokens");
  }
}

export async function refreshSpotifyToken(refreshToken) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials in environment variables.");
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const refreshResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    if (!refreshResponse.ok) {
      throw new Error(`Failed to refresh token: ${refreshResponse.statusText}`);
    }

    const refreshData = await refreshResponse.json();
    return refreshData;
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    throw new Error("Error refreshing Spotify token");
  }
}

export async function getSpotifyToken() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials in environment variables");
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch token: ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw new Error("Error fetching Spotify token");
  }
}

export async function fetchPodcastDetails(showId, token) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/shows/${showId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch podcast details: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    throw new Error("Error fetching podcast details");
  }
}

export async function fetchUserSavedPodcasts(token) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/shows", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user saved podcasts: ${errorText}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching user saved podcasts:", error);
    throw new Error("Error fetching user saved podcasts");
  }
}
