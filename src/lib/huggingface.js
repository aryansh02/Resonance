import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Summarization Function
export async function generateSummary(inputText) {
  try {
    const result = await hf.summarization({
      model: "facebook/bart-large-cnn", // Replace with another model if needed
      inputs: inputText,
      parameters: {
        max_length: 150, // Maximum tokens in the summary
        min_length: 50, // Minimum tokens in the summary
        do_sample: false, // Make the output deterministic
      },
    });
    return result.summary_text;
  } catch (error) {
    console.error(
      "Error generating summary:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate summary");
  }
}
