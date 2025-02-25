import { useState, useEffect } from "react";

const TwitterSentiment = ({ podcastTitle, guestName }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!podcastTitle) return;

    const fetchSentiment = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/twitterSentiment?podcastTitle=${encodeURIComponent(
            podcastTitle
          )}&guestName=${encodeURIComponent(guestName || "")}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data);
        } else {
          setError(data.error || "Failed to fetch sentiment analysis.");
        }
      } catch (err) {
        setError("An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
  }, [podcastTitle, guestName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Twitter Sentiment Analysis</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Sentiment Breakdown for {podcastTitle}
          </h2>
          <ul className="mt-4 space-y-2">
            {results.map((result, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded">
                <p>{result.text}</p>
                <p>
                  <strong>Sentiment:</strong> Positive: {result.sentiment.pos},{" "}
                  Neutral: {result.sentiment.neu}, Negative:{" "}
                  {result.sentiment.neg}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TwitterSentiment;
