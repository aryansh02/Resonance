import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";

const placeholderImage = "https://via.placeholder.com/64";

const Charts = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("India");
  const [filter, setFilter] = useState("Most Popular");
  const itemsPerPage = 10;

  const categories = ["All", "Technology", "Health", "Education", "Business"];
  const regions = ["India", "US", "UK", "Canada", "Australia"];
  const filters = ["Most Popular", "Recently Trending"];

  const fetchCharts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/getPodcastCharts?limit=${itemsPerPage}&offset=${
          (currentPage - 1) * itemsPerPage
        }&category=${category}&region=${region}&filter=${filter}`
      );
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

  useEffect(() => {
    fetchCharts();
  }, [currentPage, category, region, filter]);

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
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          background:
            "linear-gradient(180deg, #0B132B, #00171F, #003459, #007EA7, #00A8E8)",
          backgroundSize: "100% 300%",
          animation: "chartsGradientAnimation 12s linear infinite",
        }}
      >
        <TailSpin height="60" width="60" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          background:
            "linear-gradient(180deg, #0B132B, #00171F, #003459, #007EA7, #00A8E8)",
          backgroundSize: "100% 300%",
          animation: "chartsGradientAnimation 12s linear infinite",
        }}
      >
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 text-black"
      style={{
        background:
          "linear-gradient(180deg, #0B132B, #00171F, #003459, #007EA7, #00A8E8)",
        backgroundSize: "100% 300%",
        animation: "chartsGradientAnimation 15s linear infinite",
      }}
    >
      <style jsx>{`
        @keyframes chartsGradientAnimation {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
      `}</style>

      <h1 className="text-4xl font-semi-bold mb-24 mt-16 text-center text-shadow-lg text-white">
        Top Podcasts on Spotify
      </h1>

      {/* Filter Options */}
      <div className="flex justify-between items-center mb-8">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="p-3 bg-gray-800 text-white rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setCurrentPage(1);
          }}
          className="p-3 bg-gray-800 text-white rounded-lg"
        >
          {regions.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-3 bg-gray-800 text-white rounded-lg"
        >
          {filters.map((flt) => (
            <option key={flt} value={flt}>
              {flt}
            </option>
          ))}
        </select>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl text-white mb-4">Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-3xl shadow-lg text-center text-white">
            <h3 className="text-lg font-bold">Top Genre</h3>
            <p className="text-3xl font-extrabold mt-2">Technology</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-green-500 to-green-700 rounded-3xl shadow-lg text-center text-white">
            <h3 className="text-lg font-bold">Fastest Growing Podcast</h3>
            <p className="text-3xl font-extrabold mt-2">The AI Hour</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-purple-500 to-purple-700 rounded-3xl shadow-lg text-center text-white">
            <h3 className="text-lg font-bold">Total Podcasts Tracked</h3>
            <p className="text-3xl font-extrabold mt-2">250K+</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentData.map((podcast, index) => (
          <div
            key={podcast.id}
            className="p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">
                #{index + 1 + (currentPage - 1) * itemsPerPage}
              </span>
              <span className="text-sm bg-white text-black px-2 py-1 rounded-full">
                {podcast.publisher}
              </span>
            </div>

            <div className="w-24 h-24 relative mx-auto my-4">
              <Image
                src={podcast.image || placeholderImage}
                alt={podcast.title}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

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
