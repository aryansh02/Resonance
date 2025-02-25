import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AnalyticsAccess = () => {
  const router = useRouter();
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    router.replace("/analytics");
  }, [router]);

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

      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Redirecting to Analytics...</p>
      </div>

      <footer className="absolute bottom-8 text-center text-gray-300">
        <p>&copy; 2024 Resonance. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AnalyticsAccess;
