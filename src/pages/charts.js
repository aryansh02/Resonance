import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";

const placeholderImage = "https://via.placeholder.com/64";

const Charts = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCharts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/getPodcastCharts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch charts");
        }

        setCharts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  const totalPages = Math.ceil(charts.length / itemsPerPage);
  const currentData = charts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-blue-600 text-white flex items-center justify-center">
        <TailSpin height="60" width="60" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-blue-600 text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-blue-600 text-black p-8">
      <h1 className="text-4xl font-semi-bold mb-24 mt-16 text-center text-shadow-lg">
        Top Podcasts on Spotify
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentData.map((podcast, index) => (
          <div
            key={podcast.id}
            className="bg-black p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Rank */}
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">
                #{index + 1 + (currentPage - 1) * itemsPerPage}
              </span>
              <span className="text-sm bg-sky-500 text-black px-2 py-1 rounded-full">
                {podcast.publisher}
              </span>
            </div>

            {/* Image */}
            <div className="w-24 h-24 relative mx-auto my-4">
              <Image
                src={podcast.image || placeholderImage}
                alt={podcast.title}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Podcast Details */}
            <h2 className="text-xl font-semibold text-center text-white">
              {podcast.title}
            </h2>
            <p className="text-gray-300 text-sm mt-6 text-center">
              {podcast.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-800 text-white hover:bg-blue-950"
          }`}
        >
          Previous
        </button>
        <span className="text-white font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-800 text-white hover:bg-blue-950"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Charts;
