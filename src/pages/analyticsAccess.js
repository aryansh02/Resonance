import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SpotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const RedirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const Scope = "user-read-private user-read-email";

if (!SpotifyClientId || !RedirectUri) {
  console.error("Spotify Client ID or Redirect URI is not defined!");
}

const AnalyticsAccess = () => {
  const router = useRouter();
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = router.query.code;

    console.log("Router Query:", router.query);

    if (code) {
      const fetchSpotifyUser = async () => {
        try {
          console.log("Fetching Spotify user with code:", code);
          const response = await fetch(`/api/callback?code=${code}`);
          const data = await response.json();

          if (data.success) {
            console.log("Spotify user fetched successfully:", data.user);
            setSpotifyUser(data.user);

            console.log("Redirecting to /analytics...");
            router.replace("/analytics");
          } else {
            console.error("Failed to fetch Spotify user:", data.message);
            setError(data.message);
          }
        } catch (err) {
          console.error("Error during Spotify fetch:", err);
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };

      fetchSpotifyUser();
    } else {
      console.log("No code in query parameters.");
      setLoading(false);
    }
  }, [router.query.code, router]);

  const handleLoginWithSpotify = () => {
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${SpotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(
      RedirectUri
    )}&scope=${encodeURIComponent(Scope)}`;
    console.log("Redirecting to Spotify Auth URL:", spotifyAuthUrl);
    window.location.href = spotifyAuthUrl;
  };

  if (loading) {
    console.log("Loading state active...");
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{
        background:
          "linear-gradient(90deg, #1DB954, #191414, #1DB954, #191414)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 10s ease infinite",
      }}
    >
      <style jsx>{`
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
        .pulse {
          animation: pulseAnimation 1.5s infinite;
        }
        @keyframes pulseAnimation {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {error ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Error</h1>
          <p className="text-lg mb-8">{error}</p>
          <button
            onClick={handleLoginWithSpotify}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-bold shadow-md pulse"
          >
            Retry Log In
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 tracking-wide animate-bounce">
            Your Podcast Analytics Hub
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Discover your podcast’s impact — connect with Spotify.
          </p>
          <button
            onClick={handleLoginWithSpotify}
            className="bg-green-500 hover:bg-green-600 text-white py-4 px-10 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-105"
          >
            Log In
          </button>
        </div>
      )}

      <footer className="absolute bottom-8 text-center text-gray-300">
        <p>&copy; 2024 Resonance. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AnalyticsAccess;
