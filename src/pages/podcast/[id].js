import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";

export default function PodcastDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the podcast ID from the URL
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState([]); // AI-Generated Insights

  // Fetch Podcast Details
  useEffect(() => {
    if (!id) return; // Wait until `id` is available
    async function fetchPodcastDetails() {
      try {
        const response = await fetch(`/api/getPodcasts?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch podcast details");
        const data = await response.json();
        setPodcast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPodcastDetails();
  }, [id]);

  // Fetch AI-Generated Insights
  useEffect(() => {
    if (!id) return; // Wait until `id` is available
    async function fetchInsights() {
      try {
        const response = await fetch(`/api/getInsights?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch insights");
        const data = await response.json();
        console.log("Insights Fetched:", data); // Debugging
        setInsights(data.insights || []); // Safeguard against undefined insights
      } catch (err) {
        console.error("Error fetching insights:", err.message);
        setInsights(["Error fetching insights. Please try again later."]); // Display fallback error
      }
    }
    fetchInsights();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="text-center text-white">
        <p>No podcast found.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-10 text-white text-center">
        {podcast.title}
      </h1>
      <div className="flex justify-center">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full max-w-4xl object-contain rounded-lg"
        />
      </div>
      <p className="mt-10 text-lg text-white">{podcast.description}</p>
      <div className="mt-10">
        <h2
          className="text-2xl font-bold text-white"
          style={{
            fontFamily: "'Bungee Spice', cursive", // Apply custom font to the heading
          }}
        >
          AI-Generated Insights
        </h2>
        {insights.length > 0 ? (
          <ul
            className="mt-4 list-disc pl-6"
            style={{
              fontStyle: "italic", // Italic text
              fontSize: "1.25rem", // Larger font size
              color: "#d1d5db", // Light gray color
            }}
          >
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        ) : (
          <p
            className="mt-4"
            style={{
              fontStyle: "italic", // Italic text
              fontSize: "1.25rem", // Larger font size
              color: "#d1d5db", // Light gray color
            }}
          >
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}
