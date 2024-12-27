import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  try {
    const token = await getSpotifyToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=podcast&type=show&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Spotify API Error: ${errorText}`);
    }

    const data = await response.json();

    const podcasts = data.shows.items.map((show, index) => ({
      id: show.id,
      rank: index + 1,
      title: show.name,
      description: show.description || "No description available.",
      image: show.images[0]?.url || null,
      publisher: show.publisher || "Unknown",
    }));

    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error in /api/getPodcastCharts:", error.message);
    res.status(500).json({ error: "Failed to fetch podcast charts" });
  }
}
