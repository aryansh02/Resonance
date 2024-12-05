import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  try {
    const token = await getSpotifyToken();

    // Extract query parameters with defaults
    const { id, q = "technology", limit = 20, offset = 0 } = req.query;

    // Fetch single podcast by ID
    if (id) {
      const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Spotify API Error:", errorText);
        return res.status(response.status).json({ error: errorText });
      }

      const podcast = await response.json();
      return res.status(200).json({
        id: podcast.id,
        title: podcast.name,
        description: podcast.description,
        image: podcast.images[0]?.url || "",
      });
    }

    // Fetch podcasts based on search query
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        q
      )}&type=show&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API Error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    // Check if data exists before mapping
    if (!data.shows || !data.shows.items) {
      return res.status(404).json({ error: "No podcasts found" });
    }

    const podcasts = data.shows.items.map((show) => ({
      id: show.id,
      title: show.name,
      description: show.description,
      image: show.images[0]?.url || "/placeholder.png", // Fallback for missing images
    }));

    return res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error in /api/getPodcasts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
