import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";

export default function PodcastDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
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

  useEffect(() => {
    if (!id) return;
    async function fetchInsights() {
      setInsightsLoading(true);
      try {
        const response = await fetch(`/api/getInsights?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch insights");
        const data = await response.json();
        console.log("Insights Fetched:", data);
        setInsights(data.insights || []);
      } catch (err) {
        console.error("Error fetching insights:", err.message);
        setInsights(["Error fetching insights. Please try again later."]);
      } finally {
        setInsightsLoading(false);
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
    <div className="p-8 min-h-screen bg-gradient-to-b from-blue-800 via-blue-900 to-black text-white">
      <h1 className="text-4xl font-extrabold mb-12 text-center">
        {podcast.title}
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <p className="text-lg leading-7 text-gray-300 max-w-2xl mb-12 mt-16">
            {podcast.description}
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Podcast Details:
            </h3>
            <ul className="list-disc pl-6 text-gray-300">
              <li>
                <span className="font-bold text-gray-200">
                  Number of Episodes:
                </span>{" "}
                {podcast.episodes || "N/A"}
              </li>
              <li>
                <span className="font-bold text-gray-200">
                  Release Frequency:
                </span>{" "}
                {podcast.releaseFrequency || "N/A"}
              </li>
              <li>
                <span className="font-bold text-gray-200">
                  Average Duration:
                </span>{" "}
                {podcast.averageDuration || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-sky-400">
          AI-Generated Insights
        </h2>
        {insightsLoading ? (
          <div className="flex justify-center items-center">
            <TailSpin
              height="40"
              width="40"
              color="#00BFFF"
              ariaLabel="loading"
            />
          </div>
        ) : insights.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="text-gray-300 leading-6">
                {insight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No insights available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
