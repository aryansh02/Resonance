import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function PodcastDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchPodcastDetails() {
      try {
        const response = await fetch(`/api/getPodcasts?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch podcast details");
        const data = await response.json();
        setPodcast(data);
        setEpisodes(data.episodes || []);
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
        setInsights(data.insights || []);
      } catch (err) {
        setInsights(["Error fetching insights. Please try again later."]);
      } finally {
        setInsightsLoading(false);
      }
    }
    fetchInsights();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    async function fetchReviews() {
      try {
        const reviewsCollection = collection(db, "reviews");
        const q = query(reviewsCollection, where("podcastId", "==", id));
        const querySnapshot = await getDocs(q);
        setReviews(querySnapshot.docs.map((doc) => doc.data()));
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    async function checkBookmarkStatus() {
      try {
        const bookmarkDoc = doc(db, "bookmarks", `${user.uid}_${id}`);
        const docSnap = await getDoc(bookmarkDoc);
        setIsBookmarked(docSnap.exists());
      } catch (err) {
        console.error("Error checking bookmark status:", err);
      }
    }
    checkBookmarkStatus();
  }, [user, id]);

  const handleBookmarkPodcast = async () => {
    if (!user) {
      alert("You need to be logged in to bookmark this podcast.");
      return;
    }
    try {
      const bookmarkDoc = doc(db, "bookmarks", `${user.uid}_${podcast.id}`);
      await setDoc(bookmarkDoc, {
        userId: user.uid,
        podcastId: podcast.id,
        podcastTitle: podcast.title,
        podcastDescription: podcast.description,
        podcastImage: podcast.image,
        createdAt: new Date(),
      });
      setIsBookmarked(true);
      alert(`Podcast "${podcast.title}" has been bookmarked!`);
    } catch {
      setError("Failed to bookmark the podcast. Please try again.");
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      alert("You need to be logged in to leave a review.");
      return;
    }
    try {
      const reviewsCollection = collection(db, "reviews");
      const reviewDoc = doc(reviewsCollection, `${user.uid}_${id}`);
      await setDoc(reviewDoc, {
        userId: user.uid,
        podcastId: id,
        podcastTitle: podcast.title,
        reviewText: newReview,
        rating,
        createdAt: new Date(),
      });
      alert("Thank you for your review!");
      setNewReview("");
      setRating(0);
      const updatedReviews = [...reviews, { reviewText: newReview, rating }];
      setReviews(updatedReviews);
    } catch {
      setError("Failed to add review. Please try again.");
    }
  };

  const handleCreateSmartLink = async () => {
    if (!user || !podcast) return;
    const smartLinkData = {
      spotifyUrl: podcast.spotifyUrl || "",
      applePodcastsUrl: podcast.applePodcastsUrl || "",
      googlePodcastsUrl: podcast.googlePodcastsUrl || "",
      defaultUrl: podcast.defaultUrl || "",
    };

    try {
      const smartLinkDocId = `${user.uid}_${id}`;
      const smartLinkDoc = doc(db, "smartlinks", smartLinkDocId);
      await setDoc(smartLinkDoc, {
        ...smartLinkData,
        createdBy: user.uid,
        createdAt: new Date(),
      });

      const smartLinkUrl = `${window.location.origin}/smartlink/${smartLinkDocId}`;
      await navigator.clipboard.writeText(smartLinkUrl);

      alert("SmartLink created successfully and copied to your clipboard!");
    } catch {
      setError("Failed to create SmartLink. Please try again.");
    }
  };

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this podcast: ${podcast?.title}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    },
  ];

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
    <div
      className="pt-12 min-h-screen text-white relative"
      style={{
        animation: "gradientAnimation 10s ease-in-out infinite",
        background:
          "linear-gradient(90deg, hsla(223, 96%, 49%, 1) 0%, hsla(224, 100%, 47%, 1) 13%, hsla(233, 100%, 14%, 1) 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <style jsx global>{`
        @keyframes gradientAnimation {
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

      <h1 className="text-4xl font-extrabold text-center mb-8 mt-16">
        {podcast.title}
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-start gap-10 ml-8 mt-16">
        <div className="flex-shrink-0">
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:flex-1">
          <p className="text-lg leading-7 text-gray-300 mb-6 ml-8">
            {podcast.description}
          </p>
          <button
            onClick={handleBookmarkPodcast}
            className={`mt-4 px-4 py-2 ${
              isBookmarked ? "bg-green-700" : "bg-green-500"
            } text-white rounded-lg hover:bg-green-800 ml-8`}
            disabled={isBookmarked}
          >
            {isBookmarked ? "Added" : "Add to Bookmarks"}
          </button>

          <button
            onClick={handleCreateSmartLink}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 ml-8"
          >
            Create SmartLink
          </button>
          <div className="mt-4 ml-8">
            <span className="text-gray-400 font-bold mr-4">Share:</span>
            {shareLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 mr-2"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="lg:flex-shrink-0 lg:w-1/3 ml-8">
          <h3 className="text-xl font-semibold text-sky-400 mb-4">
            Podcast Details:
          </h3>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              <span className="font-bold text-gray-200">Publisher:</span>{" "}
              {podcast.publisher || "N/A"}
            </li>
            <li>
              <span className="font-bold text-gray-200">
                Number of Episodes:
              </span>{" "}
              {podcast.episodes || "N/A"}
            </li>
            <li>
              <span className="font-bold text-gray-200">Average Duration:</span>{" "}
              {podcast.averageDuration || "N/A"}
            </li>
            <li>
              <span className="font-bold text-gray-200">Category:</span>{" "}
              {podcast.category || "N/A"}
            </li>
            <li>
              <span className="font-bold text-gray-200">Language:</span>{" "}
              {podcast.language || "N/A"}
            </li>
            <li>
              <span className="font-bold text-gray-200">Region:</span>{" "}
              {podcast.region || "N/A"}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 p-8">
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
          <ul className="space-y-4">
            {insights.map((insight, index) => (
              <li key={index} className="text-gray-300">
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

      <div className="mt-12 p-8">
        <h2 className="text-2xl font-bold mb-6 text-sky-400">Episodes</h2>
        {episodes.length > 0 ? (
          <ul className="space-y-4">
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{episode.title}</h3>
                <p className="text-gray-300">{episode.description}</p>
                <button
                  onClick={() => handleBookmarkEpisode(episode)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                >
                  Bookmark Episode
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No episodes available at the moment.
          </p>
        )}
      </div>

      <div className="mt-12 p-8">
        <h2 className="text-2xl font-bold mb-6 text-sky-400">
          Reviews and Ratings
        </h2>
        <div className="mb-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg"
              >
                <p className="text-lg text-gray-300">{review.reviewText}</p>
                <p className="text-sm text-yellow-400">
                  Rating: {review.rating}/5
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg"
          >
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddReview}
            className="px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-800"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
