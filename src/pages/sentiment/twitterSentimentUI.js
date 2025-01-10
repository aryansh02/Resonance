import { useState } from "react";

const TwitterSentiment = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/twitterSentiment?query=${query}`);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Twitter Sentiment Analysis</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a hashtag or keyword"
        className="p-2 rounded bg-gray-700 text-white w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
      >
        Analyze Sentiment
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default TwitterSentiment;
