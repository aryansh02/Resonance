import fetch from "node-fetch";
import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  try {
    
    const token = await getSpotifyToken();

    
    const response = await fetch(
      "https://api.spotify.com/v1/browse/featured-playlists?limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify Featured API Error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    
    const podcasts = data.playlists.items.map((item) => ({
      id: item.id,
      title: item.name,
      publisher: item.owner.display_name,
      image: item.images[0]?.url || "",
    }));

    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching Featured Podcasts:", error.message);
    res.status(500).json({ error: "Failed to fetch Featured Podcasts" });
  }
}
