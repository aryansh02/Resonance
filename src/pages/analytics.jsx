import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);


const rawResults = [
  { text: "Loved the episode!", sentiment: { pos: 0.8, neu: 0.2, neg: 0 } },
  { text: "Good discussion but could be better.", sentiment: { pos: 0.4, neu: 0.5, neg: 0.1 } },
  { text: "Didn’t like the quality.", sentiment: { pos: 0.1, neu: 0.3, neg: 0.6 } },
];

const computeSentimentResults = (rawResults) => {
  const positive = rawResults.reduce((sum, item) => sum + item.sentiment.pos, 0);
  const neutral = rawResults.reduce((sum, item) => sum + item.sentiment.neu, 0);
  const negative = rawResults.reduce((sum, item) => sum + item.sentiment.neg, 0);

  return {
    chartData: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          label: "Sentiment Distribution",
          data: [positive, neutral, negative],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
    rawResults,
  };
};



const sentimentResults = computeSentimentResults(rawResults);
const Analytics = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [smartLink, setSmartLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  
    const { display_name, email, image_url } = router.query;
  
    console.log("Router query parameters:", router.query);
  
    if (!display_name || !email) {
      
      router.replace("/analyticsAccess");
    } else {
      
      setUser({
        display_name,
        email,
        image_url: image_url || null,
      });
    }
  }, [router.isReady, router.query]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Loading...</p>
      </div>
    );
  }
  console.log("Logged-in User in Analytics Page:", user);

  
  const generateSmartLink = () => {
    const generatedUrl = `https://resonance.app/smartlink/${Math.random()
      .toString(36)
      .substring(7)}`;
    setSmartLink(generatedUrl);
    setCopied(false);
  };

  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(smartLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summaryData = [
    {
      title: "Smartlink Clicks",
      value: "15K",
      color: "text-yellow-400",
    },
    {
      title: "Twitter Audience Approval",
      value: "75%",
      color: "text-green-400",
    },
    {
      title: "Retention Rate",
      value: "85%",
      color: "text-purple-400",
    },
    {
      title: "Total Listeners",
      value: "500K",
      color: "text-blue-400",
    },
  ];
  

  
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Listeners (in thousands)",
        data: [50, 70, 80, 90, 120, 150],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const regionData = {
    labels: ["North America", "Europe", "Asia", "South America", "Africa"],
    datasets: [
      {
        label: "Listeners by Region",
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const retentionData = {
    labels: ["0-5 min", "5-10 min", "10-20 min", "20-30 min", "30+ min"],
    datasets: [
      {
        label: "Listener Retention (%)",
        data: [85, 70, 50, 30, 10],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const pieData = {
    labels: ["Technology", "Health", "Business", "Education", "Lifestyle"],
    datasets: [
      {
        label: "Podcast Categories",
        data: [25, 15, 20, 30, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Engagement (minutes)",
        data: [300, 400, 350, 500],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const conversionData = {
    labels: ["Website Ads", "Social Media", "Collaborations", "Direct Traffic"],
    datasets: [
      {
        label: "Conversion Rates (%)",
        data: [25, 35, 20, 15],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const trafficData = {
    labels: ["Website Ads", "Social Media", "Collaborations"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        background:
          "linear-gradient(90deg, #03071E, #370617, #6A040F, #9D0208, #D00000, #DC2F02, #E85D04)",
        backgroundSize: "300% 300%",
        animation: "gradientAnimation 12s ease infinite",
      }}
    >
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <header className="text-center mb-16 mt-16">
        <h1 className="text-4xl font-bold">Resonance Analytics</h1>
      </header>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-3xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Total Listeners</h2>
          <p className="text-3xl font-extrabold text-blue-400">500K</p>
        </div>
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-3xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Total Engagement</h2>
          <p className="text-3xl font-extrabold text-green-400">1200H</p>
        </div>
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-3xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Top Region</h2>
          <p className="text-3xl font-extrabold text-yellow-400">North America</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4">Listener Growth</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4">Listeners by Region</h3>
          <Pie data={regionData} />
        </div>
      </section>

      <section className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12 mt-24">
        <h2 className="text-xl font-bold mb-4">Smartlink Generator</h2>
        <p className="text-gray-300 mb-6">
          Share this Smartlink on your website and social platforms to track user
          traffic and engagement.
        </p>
        <button
          onClick={generateSmartLink}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-3xl font-semibold"
        >
          Generate Smartlink
        </button>
        {smartLink && (
          <div className="mt-4">
            <p className="text-lg text-green-400 break-all">{smartLink}</p>
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </section>

      <section className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12">
        <h2 className="text-xl font-bold mb-4">Twitter Sentiment Analysis</h2>
        <p className="text-gray-300 mb-6">
          Here's how your podcast is performing on Twitter based on user feedback.
        </p>
        <Bar data={sentimentResults.chartData} />
        <div className="space-y-4 mt-6">
          {sentimentResults.rawResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-md"
            >
              <p>{result.text}</p>
              <p>
                <strong>Positive:</strong> {result.sentiment.pos.toFixed(2)},{" "}
                <strong>Neutral:</strong> {result.sentiment.neu.toFixed(2)},{" "}
                <strong>Negative:</strong> {result.sentiment.neg.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      

      <section className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md mb-12">
        <h2 className="text-xl font-bold mb-4">Spotify - Weekly Listener Retention</h2>
        <p className="text-gray-300 mb-6">
          This graph shows how your listeners engage with your podcast over time on Spotify.
        </p>
        <div style={{ height: "400px", width: "400px", margin: "0 auto" }}>
          <Line
            data={retentionData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Spotify Listener Retention" },
              },
            }}
          />
        </div>
      </section>

      <section className="bg-gray-800 bg-opacity-70 p-6 rounded-3xl shadow-md mt-12">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-900 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className={`text-3xl font-extrabold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-300">
        <p>&copy; 2024 Resonance. All Rights Reserved.</p>
      </footer>
    </div>
  );
};


export default Analytics;