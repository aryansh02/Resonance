import { useEffect, useState } from "react";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";

export default function PodcastListing() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 20; // 20 podcasts per page

  useEffect(() => {
    async function fetchPodcasts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/getPodcasts?limit=${podcastsPerPage}&offset=${
            (currentPage - 1) * podcastsPerPage
          }`
        );
        if (!response.ok) throw new Error("Failed to fetch podcasts");
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPodcasts();
  }, [currentPage]);

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-12 text-white text-center">
        Podcasts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <Link href={`/podcast/${podcast.id}`}>
              <img
                src={podcast.image}
                alt={podcast.title}
                className="mb-4 w-full h-48 object-cover rounded-lg"
              />
            </Link>
            <h2 className="text-xl font-semibold text-white">
              {podcast.title}
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              {podcast.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span className="text-white font-medium">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
