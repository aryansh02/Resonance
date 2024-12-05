export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Podcast ID is required" });
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const modelEndpoint =
    "https://api-inference.huggingface.co/models/openai-community/gpt2";

  const payload = {
    inputs: `Generate actionable and concise insights for the podcast with ID: ${id}.`,
  };

  const mockResponse = {
    id,
    insights: [
      "This podcast dives into fascinating discussions about technology and innovation.",
      "The host engages with industry experts to provide actionable insights.",
      "Listeners have praised the quality of storytelling and expert curation.",
    ],
  };

  // Helper function to parse and clean raw text
  function parseInsights(rawText) {
    const cleanedLines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 20 && !line.startsWith("Citation:")); // Remove very short or irrelevant lines

    // Remove the first line if multiple lines exist
    return cleanedLines.length > 1
      ? cleanedLines.slice(1)
      : mockResponse.insights;
  }

  try {
    const response = await fetch(modelEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Hugging Face API Error:", errorData);
      return res.status(response.status).json({
        error: errorData.error || "Loading",
        insights: mockResponse.insights, // Return mock insights in case of API error
      });
    }

    const rawData = await response.json();
    console.log("Hugging Face API Raw Response:", rawData);

    const rawText = rawData[0]?.generated_text || "";
    const insights = rawText ? parseInsights(rawText) : mockResponse.insights;

    res.status(200).json({ id, insights });
  } catch (error) {
    console.error(
      "This podcast dives into fascinating discussions about technology and innovation. The host engages with industry experts to provide actionable insights. Listeners have praised the quality of storytelling and expert curation.",
      error.message
    );
    res.status(503).json({
      error: "Failed to generate insights due to an API error.",
      insights: mockResponse.insights, // Return fallback insights
      details: error.message,
    });
  }
}
