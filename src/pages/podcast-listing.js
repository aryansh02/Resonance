import { useEffect, useState } from "react";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { db } from "../lib/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function PodcastListing() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState("Most Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const [bookmarkedPodcasts, setBookmarkedPodcasts] = useState(new Set());

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

      if (user) {
        const bookmarkedSet = new Set();
        for (const podcast of data) {
          const bookmarkDoc = doc(db, "bookmarks", `${user.uid}_${podcast.id}`);
          const docSnap = await getDoc(bookmarkDoc);
          if (docSnap.exists()) {
            bookmarkedSet.add(podcast.id);
          }
        }
        setBookmarkedPodcasts(bookmarkedSet);
      }
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

  const handleBookmark = async (podcast) => {
    if (!user) {
      alert("You need to be logged in to bookmark podcasts.");
      return;
    }
    try {
      const bookmarkDoc = doc(db, "bookmarks", `${user.uid}_${podcast.id}`);
      await setDoc(bookmarkDoc, {
        userId: user.uid,
        podcastId: podcast.id,
        podcastTitle: podcast.title,
        podcastImage: podcast.image,
        podcastDescription: podcast.description,
        createdAt: new Date(),
      });
      setBookmarkedPodcasts((prev) => new Set(prev).add(podcast.id));
      alert(`${podcast.title} has been bookmarked!`);
    } catch (err) {
      console.error("Error bookmarking podcast:", err);
      alert("Failed to bookmark podcast. Please try again.");
    }
  };

  const handleRemoveBookmark = async (podcast) => {
    if (!user) {
      alert("You need to be logged in to remove bookmarks.");
      return;
    }
    try {
      const bookmarkDoc = doc(db, "bookmarks", `${user.uid}_${podcast.id}`);
      await deleteDoc(bookmarkDoc);
      setBookmarkedPodcasts((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(podcast.id);
        return updatedSet;
      });
      alert(`${podcast.title} has been removed from bookmarks.`);
    } catch (err) {
      console.error("Error removing bookmark:", err);
      alert("Failed to remove bookmark. Please try again.");
    }
  };

  const categories = [
    "All",
    "Technology",
    "Business",
    "Education",
    "Lifestyle",
  ];

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, #2D00F7, #6A00F4, #8900F2, #B100E8, #F20089)",
        backgroundSize: "200% 200%",
        animation: "bounceGradientAnimation 8s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes bounceGradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <h1 className="text-4xl font-semi-bold text-center mb-16 mt-8">
        Podcasts
      </h1>

      <div className="flex flex-col gap-6 relative">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center justify-center w-full max-w-4xl mx-auto"
        >
          <div className="flex w-full">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="p-3 h-12 w-1/6 rounded-l-full bg-white border-r border-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="search"
              placeholder="Search podcasts..."
              className="h-12 flex-grow p-3 bg-white border-black text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-full"
            />

            <button
              type="submit"
              className="absolute right-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-black top-1/2 transform -translate-y-1/2"
            >
              <AiOutlineSearch className="text-white w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex justify-end mt-8 mb-10">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 rounded-full bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Most Popular">Most Popular</option>
              <option value="Most Recent">Most Recent</option>
            </select>
          </div>
        </div>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-purple-500 border border-transparent transition-transform transform hover:scale-105 flex flex-col justify-between"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <Link href={`/podcast/${podcast.id}`}>
                <div className="w-full h-48 relative mb-4 cursor-pointer">
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              </Link>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-white mb-2 text-center">
                  {podcast.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 text-center">
                  {podcast.description.substring(0, 100)}...
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Link href={`/podcast/${podcast.id}`}>
                  <button className="px-4 py-2 bg-purple-600 rounded-2xl text-white hover:bg-purple-800">
                    Play Now
                  </button>
                </Link>
                <button
                  onClick={() =>
                    bookmarkedPodcasts.has(podcast.id)
                      ? handleRemoveBookmark(podcast)
                      : handleBookmark(podcast)
                  }
                  className={`px-4 py-2 rounded-2xl text-white ${
                    bookmarkedPodcasts.has(podcast.id)
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-blue-600 hover:bg-blue-800"
                  }`}
                >
                  {bookmarkedPodcasts.has(podcast.id) ? "Remove" : "Bookmark"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
