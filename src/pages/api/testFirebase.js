import { app } from "../../lib/firebase";

export default function handler(req, res) {
  res.status(200).json({ message: "Firebase initialized successfully", app });
}
