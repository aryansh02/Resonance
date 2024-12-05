import staticData from "../../lib/staticData";

export default async function handler(req, res) {
  res.status(200).json(staticData);
}
