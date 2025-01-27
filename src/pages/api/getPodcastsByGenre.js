import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  try {
    const token = await getSpotifyToken();

    const { genre = "", limit = 20, offset = 0 } = req.query;

    if (!genre) {
      return res.status(400).json({ error: "Genre parameter is required" });
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        genre
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

    if (!data.shows || !data.shows.items) {
      return res.status(404).json({ error: "No podcasts found" });
    }

    const podcasts = data.shows.items.map((show) => ({
      id: show.id,
      title: show.name,
      description: show.description || "No description available.",
      image: show.images[0]?.url || "/placeholder.png",
      publisher: show.publisher || "Unknown Publisher",
    }));

    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error in /api/getPodcastsByGenre:", error.message);
    res.status(500).json({ error: "Failed to fetch podcasts by genre" });
  }
}
