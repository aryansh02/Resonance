import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import getSpotifyToken from "../../lib/spotify";

(async () => {
  try {
    const token = await getSpotifyToken();
    console.log("Spotify Access Token:", token);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
