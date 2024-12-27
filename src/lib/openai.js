import fetch from "node-fetch";

export async function generateSummary(inputText, title = "", category = "") {
  try {
    const prompt = `
      Podcast Title: ${title || "Unknown"}
      Category: ${category || "General"}
      Description: ${inputText}.
      Generate three concise, actionable, and insightful takeaways for this podcast. Ensure that the insights are:
      1. Relevant to the topic.
      2. Written in a clear and professional tone.
      3. Useful for the target audience.
    `;

    console.log("Prompt sent to OpenAI:", prompt);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt.trim() },
        ],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      throw new Error(`OpenAI API Error: ${errorText}`);
    }

    const data = await response.json();
    const rawText = data.choices[0]?.message?.content.trim();

    if (!rawText || rawText.length === 0) {
      console.warn("No valid AI-generated response, falling back.");
      return null;
    }

    const insights = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.includes("http"));

    return insights.length > 0 ? insights : null;
  } catch (error) {
    console.error("Error generating insights from OpenAI:", error.message);
    throw new Error("Failed to generate insights from OpenAI");
  }
}
