export default async function handler(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: "Text input is required for insights" });
      return;
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face Error:", errorText);
      res.status(response.status).json({ error: errorText });
      return;
    }

    const data = await response.json();
    res
      .status(200)
      .json({ summary: data[0]?.summary_text || "No insights available." });
  } catch (error) {
    console.error("Error in /api/testHuggingFace:", error.message);
    res.status(500).json({ error: "Failed to generate insights" });
  }
}
