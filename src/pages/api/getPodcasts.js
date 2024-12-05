const { getSpotifyToken } = require("../../lib/spotify");

export default async function handler(req, res) {
  try {
    const token = await getSpotifyToken();

    // Check for a specific podcast ID
    const { id, q = "technology", limit = 20, offset = 0 } = req.query;

    if (id) {
      // Fetch details of a specific podcast
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
    } else {
      // Fetch a list of podcasts with pagination
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
      const podcasts = data.shows.items.map((show) => ({
        id: show.id,
        title: show.name,
        description: show.description,
        image: show.images[0]?.url || "",
      }));

      return res.status(200).json(podcasts);
    }
  } catch (error) {
    console.error("Error in /api/getPodcasts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
