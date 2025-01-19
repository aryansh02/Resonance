export default function handler(req, res) {
  const SpotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const RedirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!SpotifyClientId || !RedirectUri) {
    console.error("Spotify Client ID or Redirect URI is not defined!");
    res.status(500).send("Internal Server Error");
    return;
  }

  const Scope = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SpotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(
    RedirectUri
  )}&scope=${encodeURIComponent(Scope)}`;

  res.redirect(authUrl);
}
