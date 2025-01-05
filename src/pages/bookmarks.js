import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";

const Bookmarks = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const bookmarksCollection = collection(db, "bookmarks");
        const q = query(bookmarksCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedBookmarks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookmarks(fetchedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, router]);

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const bookmarkDocRef = doc(db, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkDocRef);
      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.id !== bookmarkId)
      );
      alert("Bookmark removed successfully.");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      alert("Failed to remove bookmark. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading bookmarks...</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>No bookmarks found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Your Bookmarks</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-indigo-600 rounded-3xl hover:bg-indigo-800"
        >
          Back to Dashboard
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="p-6 bg-black rounded-3xl shadow-md hover:shadow-lg transition"
          >
            <div className="w-full h-48 relative mb-4">
              <Image
                src={bookmark.podcastImage}
                alt={bookmark.podcastTitle}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {bookmark.podcastTitle}
            </h2>
            <p className="text-gray-400 text-sm">
              {bookmark.podcastDescription.substring(0, 100)}...
            </p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => router.push(`/podcast/${bookmark.podcastId}`)}
                className="px-4 py-2 bg-blue-600 rounded-3xl hover:bg-blue-800"
              >
                View Podcast
              </button>
              <button
                onClick={() => handleRemoveBookmark(bookmark.id)}
                className="px-4 py-2 bg-red-600 rounded-3xl hover:bg-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
