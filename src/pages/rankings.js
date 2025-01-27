import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const placeholderImage = "https://via.placeholder.com/64";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("Card");

  const fetchRankings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/getPodcastCharts`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }

      setRankings(data);
    } catch (err) {
      console.error("Error fetching rankings:", err.message);
      setError(err.message || "Failed to fetch podcast rankings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <TailSpin height="60" width="60" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="text-center">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={fetchRankings}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "#1c1c1c", color: "white" }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold ml-4 mt-6 mb-6">Top Shows</h1>
        <div className="flex items-center space-x-4 mt-6 mb-6">
          <button
            onClick={() => setView("Card")}
            className={`px-4 py-2 rounded-3xl ${
              view === "Card" ? "bg-blue-600 text-white" : "bg-gray-500"
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setView("Leaderboard")}
            className={`px-4 py-2 rounded-3xl ${
              view === "Leaderboard" ? "bg-blue-600 text-white" : "bg-gray-500"
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {view === "Card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {rankings.map((podcast, index) => (
            <div
              key={podcast.id}
              onClick={() => (window.location.href = `/podcast/${podcast.id}`)}
              className="p-4 shadow-lg hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
              style={{
                backgroundColor: "#1c1c1c",
                boxShadow: "none",
              }}
            >
              <img
                src={podcast.image || placeholderImage}
                alt={podcast.title}
                className="w-full h-56 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-400">#{index + 1}</p>
                <h2 className="text-md text-gray-300 mt-2">{podcast.title}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {podcast.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-4 overflow-x-auto"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Podcast</th>
                <th className="px-4 py-2 text-left">Publisher</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((podcast, index) => (
                <tr
                  key={podcast.id}
                  onClick={() =>
                    (window.location.href = `/podcast/${podcast.id}`)
                  }
                  className={`hover:bg-gray-700 cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center space-x-4">
                    <img
                      src={podcast.image || placeholderImage}
                      alt={podcast.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{podcast.title}</span>
                  </td>
                  <td className="px-4 py-2">{podcast.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rankings;
