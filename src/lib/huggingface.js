import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function generateSummary(inputText) {
  try {
    const result = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: inputText,
      parameters: {
        max_length: 150,
        min_length: 50,
        do_sample: false,
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
