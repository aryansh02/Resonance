import React, { useState } from "react";
import { mockCharts } from "../lib/mockCharts";

const placeholderImage = "https://via.placeholder.com/64";

const Charts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockCharts.length / itemsPerPage);

  const currentData = mockCharts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Podcast Charts</h1>
      <div className="flex flex-col gap-6 items-center">
        {currentData.map((podcast) => (
          <div
            key={podcast.rank}
            className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl flex items-center gap-4"
          >
            {/* Rank */}
            <span className="text-3xl font-bold text-gray-800">
              {podcast.rank}
            </span>
            {/* Podcast Image */}
            <img
              src={podcast.image || placeholderImage} // Use placeholder if image is missing
              onError={(e) => {
                e.target.src = placeholderImage; // Fallback for broken image URLs
              }}
              alt={podcast.title}
              className="w-24 h-24 object-contain rounded-full"
            />
            {/* Podcast Info */}
            <div>
              <h2 className="text-xl font-semibold">{podcast.title}</h2>
              <p className="text-gray-600 text-sm">{podcast.description}</p>
              <p className="text-sm font-bold">Listens: {podcast.listens}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Charts;
