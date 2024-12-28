import { generateSummary } from "../../lib/openai";
import { getSpotifyToken } from "../../lib/spotify";

async function fetchPodcastDetails(id) {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API Error:", errorText);
      throw new Error(`Failed to fetch podcast details: ${errorText}`);
    }

    const podcast = await response.json();
    return {
      title: podcast.name,
      description: podcast.description,
      category: podcast.publisher || "General",
    };
  } catch (error) {
    console.error("Error fetching podcast details:", error.message);
    throw new Error("Failed to fetch podcast details");
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Podcast ID is required" });
  }

  const mockResponse = {
    id,
    insights: [
      "This podcast provides actionable advice on financial literacy for young professionals.",
      "Listeners have praised the engaging storytelling and clear breakdown of complex topics.",
      "The host features guest experts to provide deeper insights into industry trends.",
    ],
  };

  try {
    const podcastDetails = await fetchPodcastDetails(id);

    const inputText = `
      Podcast Title: ${podcastDetails.title}.
      Description: ${podcastDetails.description || "No description provided"}.
      Category: ${podcastDetails.category}.
    `;

    const insightsText = await generateSummary(
      podcastDetails.description,
      podcastDetails.title,
      podcastDetails.category
    );

    const insights = insightsText
      ? insightsText
          .map((line) => line.trim())
          .filter((line) => line.length > 20 && !line.startsWith("Generate"))
      : mockResponse.insights;

    if (insights.length === 0) {
      console.warn("AI failed to generate valid insights. Using fallback.");
      return res.status(200).json({ id, insights: mockResponse.insights });
    }

    res.status(200).json({ id, insights });
  } catch (error) {
    console.error("Error in /api/getInsights:", error.message);
    res.status(503).json({
      error: "Failed to generate insights due to an API error.",
      insights: mockResponse.insights,
    });
  }
}
