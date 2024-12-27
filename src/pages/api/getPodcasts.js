import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  try {
    const token = await getSpotifyToken();

    const {
      id,
      q = "",
      category = "All",
      filter = "Most Popular",
      limit = 20,
      offset = 0,
    } = req.query;

    // Fetch details for a single podcast by ID
    if (id) {
      const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Spotify API Error (By ID):", errorText);
        return res.status(response.status).json({ error: errorText });
      }

      const podcast = await response.json();

      // Mock extended details (replace with actual data if available)
      const mockEpisodes = podcast.episodes?.total || 50; // Total episodes
      const mockReleaseFrequency = "Weekly"; // Example release frequency
      const mockAverageDuration = "30 min"; // Example duration

      return res.status(200).json({
        id: podcast.id,
        title: podcast.name,
        description: podcast.description,
        image: podcast.images[0]?.url || "",
        publisher: podcast.publisher || "Unknown Publisher",
        episodes: mockEpisodes,
        releaseFrequency: mockReleaseFrequency,
        averageDuration: mockAverageDuration,
      });
    }

    // Default search query
    const searchQuery = q.trim()
      ? q.trim()
      : category !== "All"
      ? category
      : "technology";

    console.log("Search Query Sent to Spotify:", searchQuery);

    // Fetch podcasts based on search query
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery
      )}&type=show&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API Error (Search):", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    if (!data.shows || !data.shows.items) {
      return res.status(404).json({ error: "No podcasts found" });
    }

    let podcasts = data.shows.items.map((show) => ({
      id: show.id,
      title: show.name,
      description: show.description,
      image: show.images[0]?.url || "/placeholder.png",
      publisher: show.publisher,
    }));

    // Apply sorting based on the filter
    if (filter === "Most Popular") {
      podcasts = podcasts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filter === "Most Recent") {
      podcasts = podcasts.sort((a, b) => a.id.localeCompare(b.id));
    }

    return res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error in /api/getPodcasts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
