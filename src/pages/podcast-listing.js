import { useEffect, useState } from "react";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const placeholderImage = "https://via.placeholder.com/64";

export default function PodcastListing() {
  const sections = [
    { name: "On the Record", genre: "news" },
    { name: "Beyond the Bottom Line", genre: "business" },
    { name: "Innovation Unplugged", genre: "technology" },
    { name: "The Humor Hour", genre: "comedy" },
    { name: "Wisdom on Air", genre: "education" },
    { name: "Zen & Zest", genre: "health-and-fitness" },
  ];

  const [podcastsByGenre, setPodcastsByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPodcastsByGenre = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedData = {};
      for (const section of sections) {
        const response = await fetch(
          `/api/getPodcastsByGenre?genre=${section.genre}&limit=20`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch podcasts for ${section.name}. Server responded with: ${errorText}`
          );
        }
        const data = await response.json();
        fetchedData[section.genre] = data;
      }
      setPodcastsByGenre(fetchedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcastsByGenre();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <TailSpin height="60" width="60" color="#00BFFF" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="text-center">
          <p className="text-xl mb-4">Error: {error}</p>
          <button
            onClick={fetchPodcastsByGenre}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-8 min-h-screen text-white space-y-16"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <div className="mb-20 mt-16 flex justify-center">
        <h1 className="text-4xl font-bold text-center">Browse</h1>
      </div>

      {sections.map((section) => {
        const podcasts = podcastsByGenre[section.genre] || [];

        const groupedPodcasts = [];
        for (let i = 0; i < podcasts.length; i += 10) {
          groupedPodcasts.push(podcasts.slice(i, i + 10));
        }

        return (
          <div key={section.genre} className="mb-24">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ marginLeft: "10px" }}
            >
              {section.name}
            </h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-4">
                  {groupedPodcasts.map((group, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="grid grid-cols-5 gap-y-8 gap-x-4 mb-6"
                      style={{ minWidth: "100%" }}
                    >
                      {group.map((podcast, index) => (
                        <div
                          key={podcast.id || index}
                          className="p-4 shadow-lg hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
                          style={{
                            backgroundColor: "#1c1c1c",
                            boxShadow: "none",
                          }}
                        >
                          <Link href={`/podcast/${podcast.id}`}>
                            <div className="w-full h-56 relative mb-4">
                              <Image
                                src={podcast.image || placeholderImage}
                                alt={podcast.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            </div>
                          </Link>
                          <div>
                            <h2 className="text-md text-gray-300 mt-2 text-center">
                              {podcast.title}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1 text-center">
                              {podcast.publisher}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
