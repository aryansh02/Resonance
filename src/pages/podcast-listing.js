import { useEffect, useState } from "react";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function PodcastListing() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");

  const podcastsPerPage = 20;

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/getPodcasts?limit=${podcastsPerPage}&offset=${
          (currentPage - 1) * podcastsPerPage
        }&category=${category}&filter=${filter}&q=${searchQuery}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch podcasts. Server responded with: ${errorText}`
        );
      }
      const data = await response.json();
      setPodcasts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, [currentPage, category, filter, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(e.target.search.value.trim());
  };

  const categories = [
    "All",
    "Technology",
    "Business",
    "Education",
    "Lifestyle",
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-blue-700 via-indigo-900 to-black text-white">
      {/* Title */}
      <h1 className="text-4xl font-semi-bold text-center mb-16 mt-12">
        Podcasts
      </h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-4 w-full max-w-lg"
        >
          <input
            type="text"
            name="search"
            placeholder="Search podcasts..."
            className="flex-grow p-2 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-800 text-gray-300 border-gray-600"
              } hover:bg-blue-900 hover:border-blue-700`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Sort By:</span>
          <button
            onClick={() => setFilter("Most Popular")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              filter === "Most Popular"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            } hover:bg-blue-900`}
          >
            Popular
          </button>
          <button
            onClick={() => setFilter("Most Recent")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              filter === "Most Recent"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            } hover:bg-blue-900`}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Podcast Cards */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <TailSpin
            height="60"
            width="60"
            color="#00BFFF"
            ariaLabel="loading"
          />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchPodcasts}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-500 border border-transparent transition-transform transform hover:scale-105"
            >
              {/* Podcast Image */}
              <Link href={`/podcast/${podcast.id}`}>
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              </Link>
              <h2 className="text-xl font-bold text-white mb-2 text-center">
                {podcast.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 text-center">
                {podcast.description.substring(0, 100)}...
              </p>
              <div className="flex justify-center">
                <button className="px-4 py-2 bg-blue-600 rounded-2xl text-white hover:bg-blue-700">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
        >
          <AiOutlineArrowLeft />
          Previous
        </button>
        <span className="text-white font-medium">
          Page {currentPage} of {Math.ceil(podcasts.length / podcastsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
        >
          Next
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}
