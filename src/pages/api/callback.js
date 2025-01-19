import { getSpotifyTokens } from "../../lib/spotify";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { code } = req.query;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Authorization code is missing." });
    }

    try {
      const tokens = await getSpotifyTokens(code);

      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error(`Spotify API error: ${userResponse.statusText}`);
      }

      const spotifyUser = await userResponse.json();

      const userData = {
        id: spotifyUser.id,
        display_name: spotifyUser.display_name,
        email: spotifyUser.email,
        followers: spotifyUser.followers.total,
        profile_url: spotifyUser.external_urls.spotify,
        image_url:
          spotifyUser.images && spotifyUser.images.length > 0
            ? spotifyUser.images[0].url
            : null,
      };

      const queryParams = new URLSearchParams({
        display_name: userData.display_name,
        email: userData.email,
        image_url: userData.image_url || "",
      });

      res.redirect(`/analytics?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error during Spotify callback:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
