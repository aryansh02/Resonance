import axios from "axios";
import vader from "vader-sentiment";

export default async function handler(req, res) {
  const { podcastTitle, guestName } = req.query;
  if (!podcastTitle) {
    return res.status(400).json({ error: "Podcast title is required" });
  }

  const searchQuery = `"${podcastTitle}" OR #${podcastTitle.replace(
    /\s+/g,
    ""
  )} OR "${guestName}"`;

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent`,
      {
        params: {
          query: searchQuery,
          max_results: 15, // Fetch more relevant tweets
        },
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const tweets = response.data.data || [];

    const analyzedTweets = tweets.map((tweet) => {
      const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(
        tweet.text
      );
      return {
        text: tweet.text,
        sentiment,
      };
    });

    res.status(200).json(analyzedTweets);
  } catch (error) {
    console.error("Error fetching tweets or analyzing sentiment:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch tweets or analyze sentiment" });
  }
}
