import { getSpotifyToken } from "../../lib/spotify";

export default async function handler(req, res) {
  const token = await getSpotifyToken();
  res
    .status(200)
    .json({ message: "Spotify API connected successfully", token });
}
