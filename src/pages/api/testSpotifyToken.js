require("dotenv").config({ path: ".env.local" }); // Load environment variables

const { getSpotifyToken } = require("../../lib/spotify");

(async () => {
  try {
    const token = await getSpotifyToken();
    console.log("Spotify Access Token:", token);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
