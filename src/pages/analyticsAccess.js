import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/router";

const AnalyticsAccess = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    podcastName: "",
    email: "",
    podcastPlatform: "",
    platformLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.podcastName || !formData.email || !formData.platformLink) {
      setError("Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const smartLinkId = `${user.uid}_${formData.podcastName.replaceAll(
        " ",
        "_"
      )}`;
      const smartLinkData = {
        userId: user.uid,
        podcastName: formData.podcastName,
        email: formData.email,
        podcastPlatform: formData.podcastPlatform,
        platformLink: formData.platformLink,
        smartLinkId,
        createdAt: new Date(),
      };

      const docRef = doc(db, "smartLinks", smartLinkId);
      await setDoc(docRef, smartLinkData);

      router.push(`/analytics/${smartLinkId}`);
    } catch (err) {
      console.error("Error saving SmartLink:", err);
      setError("Failed to generate SmartLink. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-8">
      <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Unlock Analytics for Your Podcast
        </h1>
        <p className="text-center mb-6 text-gray-400">
          Sign up as a podcast creator and fill in the details below to access
          detailed analytics and SmartLinks for your podcast.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="podcastName" className="block text-sm font-medium">
              Podcast Name *
            </label>
            <input
              type="text"
              id="podcastName"
              name="podcastName"
              value={formData.podcastName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white mt-2"
              placeholder="Enter the name of your podcast"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white mt-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="podcastPlatform"
              className="block text-sm font-medium"
            >
              Podcast Platform
            </label>
            <select
              id="podcastPlatform"
              name="podcastPlatform"
              value={formData.podcastPlatform}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white mt-2"
            >
              <option value="" disabled>
                Select platform
              </option>
              <option value="Spotify">Spotify</option>
              <option value="Apple Podcasts">Apple Podcasts</option>
              <option value="Google Podcasts">Google Podcasts</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="platformLink" className="block text-sm font-medium">
              Platform Link *
            </label>
            <input
              type="url"
              id="platformLink"
              name="platformLink"
              value={formData.platformLink}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white mt-2"
              placeholder="Enter the podcast link on the platform"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg ${
              loading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-bold`}
            disabled={loading}
          >
            {loading ? "Generating SmartLink..." : "Submit & Generate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnalyticsAccess;
