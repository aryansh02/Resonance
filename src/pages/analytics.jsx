import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Particles } from "@tsparticles/react";
import { loadFull } from "@tsparticles/engine";
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



const sentimentResults = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Positive Sentiment",
      data: [60, 75, 50, 90, 85, 95], 
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderRadius: 5,
    },
    {
      label: "Neutral Sentiment",
      data: [30, 50, 40, 45, 60, 55],
      backgroundColor: "rgba(255, 206, 86, 0.7)", 
      borderRadius: 5,
    },
    {
      label: "Negative Sentiment",
      data: [10, 25, 20, 15, 30, 25],
      backgroundColor: "rgba(255, 99, 132, 0.7)", 
      borderRadius: 5,
    },
  ],
};
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
        label: "Total Listeners",
        data: [186, 305, 237, 73, 209, 214], 
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderRadius: 10, 
      },
    ],
  };

  const regionData = {
    labels: ["North America", "Europe", "Asia", "South America", "Africa"],
    datasets: [
      {
        label: "Listeners by Region",
        data: [1125, 850, 600, 400, 300], 
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",  
          "rgba(54, 162, 235, 0.7)", 
          "rgba(255, 206, 86, 0.7)",  
          "rgba(75, 192, 192, 0.7)", 
          "rgba(153, 102, 255, 0.7)", 
        ],
        borderWidth: 3,
        cutout: "70%", 
      },
    ],
  };

  const browserData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    datasets: [
      {
        label: "Usage",
        data: [500, 350, 280, 200, 120], 
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",  
          "rgba(255, 99, 132, 0.7)", 
          "rgba(255, 206, 86, 0.7)",  
          "rgba(153, 102, 255, 0.7)", 
          "rgba(75, 192, 192, 0.7)",  
        ],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const retentionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], 
    datasets: [
      {
        label: "Returning Listeners",
        data: [180, 250, 190, 220, 230, 240], 
        backgroundColor: "rgba(54, 162, 235, 0.6)", 
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true, 
      },
      {
        label: "New Listeners",
        data: [100, 150, 120, 140, 130, 160], 
        backgroundColor: "rgba(153, 102, 255, 0.6)", 
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true, 
      },
    ],
  };

  const deviceData = {
    labels: ["Apr 2", "Apr 7", "Apr 12", "Apr 17", "Apr 22", "Apr 27", "May 2", "May 7", "May 12", "May 17", "May 22", "May 27", "Jun 2", "Jun 7", "Jun 12", "Jun 17", "Jun 22", "Jun 27", "Jun 30"],
    datasets: [
      {
        label: "Mobile",
        data: [150, 170, 160, 180, 190, 200, 195, 210, 205, 220, 215, 230, 225, 240, 235, 250, 245, 260, 255],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Desktop",
        data: [200, 250, 240, 280, 300, 320, 310, 340, 330, 350, 340, 370, 360, 380, 370, 400, 390, 420, 410],
        backgroundColor: "rgba(54, 162, 235, 0.5)", 
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
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

  const SummaryBox = ({ title, insights, tableData }) => {
    return (
      <div className="bg-gray-900 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <ul className="text-gray-300 mb-4">
          {insights.map((insight, index) => (
            <li key={index} className="mb-1 flex items-center">
              <span className="mr-2">🔹</span> {insight}
            </li>
          ))}
        </ul>
        {tableData && (
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-600">
                {tableData.headers.map((header, index) => (
                  <th key={index} className="p-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, index) => (
                <tr key={index} className="border-b border-gray-700">
                  {row.map((cell, i) => (
                    <td key={i} className="p-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen text-white bg-black">
    
    <Particles
  id="tsparticles"
  init={loadFull}
  options={{
    fullScreen: { enable: false },
    background: {
      color: "#000000", 
    },
    particles: {
      number: {
        value: 80, 
        density: { enable: true, area: 800 },
      },
      color: { value: "#ffffff" }, 
      shape: { type: "circle" },
      opacity: {
        value: 0.8,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        outModes: "out",
      },
      links: {
        enable: true, 
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 },
      },
    },
  }}
  className="absolute inset-0 w-full h-full"
/>


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
      <div className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-bold mb-4">Listener Growth</h3>
    <Bar
      data={barData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
    <p className="text-gray-400 mt-4">Audience growth trends over the last 6 months, with a 5.2% increase this month 📈.</p>
   
  </div>
  <div className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col">
  <h3 className="text-lg font-bold mb-4">Listeners by Region</h3>

  
  <div className="flex justify-center items-center relative">
    
    
    <div className="relative flex-grow" style={{ width: "350px", height: "350px" }}>
      <Pie
        data={regionData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                color: "white",
                font: { size: 14 },
                padding: 12,
              },
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (tooltipItem) {
                  let value = tooltipItem.raw || 0;
                  return ` ${value} Listeners`;
                },
              },
            },
          },
        }}
      />

      
      <div
        className="absolute flex items-center justify-center text-white text-2xl font-bold"
        style={{
          pointerEvents: "none",
          left: "10%",
          top: "45%",
          transform: "translate(-10%, -10%)", 
          width: "70%",
        }}
      >
        {regionData.datasets[0].data.reduce((acc, val) => acc + val, 0)} <br /> Visitors
      </div>
    </div>

  </div>

  
  <p className="text-gray-400 mt-6 text-center">
    Geographic distribution of listeners, highlighting key growth regions.
  </p>
</div>
      </section>

      <section className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12 flex flex-col md:flex-row">
  
  <div className="w-full md:w-3/4">
    <h2 className="text-xl font-bold mb-4">Listeners by Device</h2>
    <p className="text-gray-300 mb-6">
      Track how your audience engages with your content based on their device type.
    </p>

    <div style={{ height: "350px", width: "100%" }}>
      <Line
        data={deviceData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            y: { beginAtZero: true },
            x: { display: true },
          },
        }}
      />
    </div>
    
    <p className="text-gray-300 mt-8">Showing total visitors for the last 3 months</p>
    <p className="text-gray-400">Monitoring device usage trends for content accessibility and engagement.</p>

  </div>


  
  <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-70 rounded-2xl p-6 mt-6 md:mt-0 md:ml-6 flex flex-col">
  <h3 className="text-lg font-bold mb-4">📊 Key Insights</h3>
  
  <ul className="text-gray-300 space-y-4">
    <li>📈 <strong>Mobile Engagement Surge:</strong>
      <ul className="ml-4 text-sm space-y-1">
        <li>📱 Mobile listeners increased <span className="text-green-400 font-semibold">X%</span> compared to last month.</li>
        <li>⏰ Peak engagement hours: <span className="text-blue-400 font-semibold">8 PM - 10 PM</span> on mobile.</li>
      </ul>
    </li>

    <li>💻 <strong>Desktop Retention Trends:</strong>
      <ul className="ml-4 text-sm space-y-1">
        <li>📊 <span className="text-green-400 font-semibold">Y%</span> of desktop listeners stay for more than 20 minutes.</li>
        <li>🎧 Desktop users have a <span className="text-yellow-400 font-semibold">higher completion rate</span> of episodes than mobile.</li>
      </ul>
    </li>

    
  </ul>

  <table className="mt-12 w-full bg-opacity-70 text-gray-400 border-separate border-spacing-y-2">
    <thead>
      <tr>
        <th className="text-left pb-2">Last Month</th>
        <th className="text-center pb-2">Mobile</th>
        <th className="text-center pb-2">Desktop</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-900 rounded-lg">
        <td className="py-2 px-3 rounded-l-lg">April</td>
        <td className="text-center px-3">3.2% ⬆</td>
        <td className="text-center px-3 rounded-r-lg">0.8% ⬆</td>
      </tr>
      <tr className="bg-gray-900 rounded-lg">
        <td className="py-2 px-3 rounded-l-lg">May</td>
        <td className="text-center px-3">2.8% ⬆</td>
        <td className="text-center px-3 rounded-r-lg">1.2% ⬇</td>
      </tr>
      <tr className="bg-gray-900 rounded-lg">
        <td className="py-2 px-3 rounded-l-lg">June</td>
        <td className="text-center px-3">4.5% ⬆</td>
        <td className="text-center px-3 rounded-r-lg">0.5% ⬇</td>
      </tr>
    </tbody>
  </table>
</div>
</section>

<section className="bg-gray-900 p-6 bg-opacity-70 rounded-3xl shadow-md hover:shadow-lg transition mb-12 flex flex-col md:flex-row">
  
  
  <div className="w-full md:w-3/4">
    <h2 className="text-xl font-bold mb-4">Top Browsers Used by Listeners</h2>
    <p className="text-gray-300 mb-6">
      Discover which browsers your audience prefers for streaming your content.
    </p>

    <div style={{ height: "350px", width: "100%" }}>
      <Bar
        data={browserData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          scales: {
            x: { display: true },
            y: { beginAtZero: true },
          },
        }}
      />
    </div>

    <p className="text-gray-300 mt-20">
      Browser usage shifts by <span className="text-green-400 font-semibold">8.6%</span> this month, with <span className="text-blue-400 font-semibold">Chrome leading the growth 📈</span>.
    </p>
    <p className="text-gray-400">Tracking browser preferences among listeners for better optimization insights.</p>
  </div>

  
  <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-70 rounded-2xl p-6 mt-6 md:mt-0 md:ml-6 flex flex-col">
    <h3 className="text-lg font-bold mb-4">📊 Key Insights</h3>

    <ul className="text-gray-300 space-y-4">
      <li>🌍 <strong>Browser Preference Trends:</strong>
        <ul className="ml-4 text-sm space-y-1">
          <li>📈 Chrome dominates with <span className="text-green-400 font-semibold">X%</span> of total listeners.</li>
          <li>🍏 Safari is the top choice for iOS users, with <span className="text-blue-400 font-semibold">Y%</span> growth.</li>
        </ul>
      </li>

      <li>📊 <strong>Engagement Insights:</strong>
        <ul className="ml-4 text-sm space-y-1">
          <li>💻 Firefox users have <span className="text-yellow-400 font-semibold">higher retention</span> for long-form content.</li>
          <li>🛠 Edge users show steady engagement but a <span className="text-red-400 font-semibold">drop-off</span> after 10 minutes.</li>
        </ul>
      </li>

     
    </ul>

    
    <table className="mt-12 w-full text-gray-400 border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th className="text-left pb-2">Browser</th>
          <th className="text-center pb-2">% Change</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Chrome</td>
          <td className="text-center px-3 text-green-400">+5.2% ⬆</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Safari</td>
          <td className="text-center px-3 text-green-400">+3.1% ⬆</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Firefox</td>
          <td className="text-center px-3 text-red-400">-2.5% ⬇</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Edge</td>
          <td className="text-center px-3 text-green-400">+1.8% ⬆</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

      

<section className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12 flex flex-col md:flex-row">
  
 
  <div className="w-full md:w-3/4">
    <h2 className="text-xl font-bold mb-4">Twitter Sentiment Analysis</h2>
    <p className="text-gray-300 mb-6">
      Breakdown of how your podcast is being received on Twitter.
    </p>

    <div style={{ height: "350px", width: "100%" }}>
      <Bar
        data={sentimentResults}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />
    </div>

    <p className="text-gray-400 mt-8">
      Sentiment score increased by <span className="text-green-400 font-semibold">10.2%</span> this month 📈.
    </p>
    <p className="text-gray-500">Analyzing audience sentiment from Twitter interactions over the past 6 months.</p>

    
    <div className="mt-6 space-y-4">
      {rawResults.map((result, index) => (
        <div key={index} className="bg-gray-900 bg-opacity-70 p-4 rounded-xl shadow-md flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300">
            🐦
          </div>
          <div className="flex-1">
            <p className="text-gray-300">{result.text}</p>
            <p className="text-sm text-gray-400 mt-1">
              <strong className="text-green-400">Positive:</strong> {result.sentiment.pos.toFixed(2)} | 
              <strong className="text-yellow-400"> Neutral:</strong> {result.sentiment.neu.toFixed(2)} | 
              <strong className="text-red-400"> Negative:</strong> {result.sentiment.neg.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  
  <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-70 rounded-2xl p-6 mt-6 md:mt-0 md:ml-6 flex flex-col">
    <h3 className="text-lg font-bold mb-12">📊 Key Insights</h3>

    <ul className="text-gray-300 space-y-4">
      <li>📈 <strong>Overall Sentiment:</strong>
        <ul className="ml-4 text-sm space-y-1 mt-4 mb-16">
          <li>😊 Positive sentiment increased by <span className="text-green-400 font-semibold">X%</span>.</li>
          <li>😐 Neutral sentiment stable at <span className="text-yellow-400 font-semibold">Y%</span>.</li>
        </ul>
      </li>

      <li>💬 <strong>Common Themes:</strong>
        <ul className="ml-4 text-sm space-y-1 mt-4 mb-16">
          <li>🔥 Most mentioned topics: <span className="text-blue-400 font-semibold">A, B, C</span>.</li>
          <li>🚀 Engagement peak at <span className="text-blue-400 font-semibold">8 PM - 9 PM</span>.</li>
        </ul>
      </li>

      <li>⚡ <strong>Actionable Steps:</strong>
        <ul className="ml-4 text-sm space-y-1 mt-4 mb-16">
          <li>📢 Respond to negative feedback to boost sentiment.</li>
          <li>🎙 Engage with trending discussions to increase reach.</li>
        </ul>
      </li>
    </ul>

    
    <table className="mt-8 w-full text-gray-400 border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th className="text-left pb-2">Sentiment</th>
          <th className="text-center pb-2">Change</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Positive</td>
          <td className="text-center px-3 text-green-400">+5.3% ⬆</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Neutral</td>
          <td className="text-center px-3 text-yellow-400">+1.2% ⬆</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">Negative</td>
          <td className="text-center px-3 text-red-400">-3.8% ⬇</td>
        </tr>
      </tbody>
    </table>
  </div>

</section>

      

<section className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12 flex flex-col md:flex-row">
  
  
  <div className="w-full md:w-3/4">
    <h2 className="text-xl font-bold mb-4">Spotify Weekly Listener Retention</h2>
    <p className="text-gray-300 mb-6">
      Tracking how your audience retains over time on Spotify.
    </p>

    <div style={{ height: "350px", width: "100%" }}>
      <Line
        data={retentionData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: { color: "white" },
            },
            tooltip: { enabled: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: "white" },
            },
            x: {
              ticks: { color: "white" },
            },
          },
        }}
      />
    </div>

    <div className="flex items-center justify-center gap-4 mt-4">
      <span className="flex items-center gap-2 text-gray-300">
        <span className="w-4 h-4 bg-blue-500 rounded-full"></span> Returning Listeners
      </span>
      <span className="flex items-center gap-2 text-gray-300">
        <span className="w-4 h-4 bg-purple-500 rounded-full"></span> New Listeners
      </span>
    </div>

    <p className="text-gray-400 mt-8">
      Listener retention increased by <span className="text-green-400 font-semibold">X%</span> this month 📈.
    </p>
    <p className="text-gray-500">January - June 2024</p>
  </div>

  
  <div className="w-full md:w-1/3 bg-gray-900 bg-opacity-70 rounded-2xl p-6 mt-6 md:mt-0 md:ml-6 flex flex-col">
    <h3 className="text-lg font-bold mb-4">📊 Key Insights</h3>

    <ul className="text-gray-300 space-y-4">
      <li>📈 <strong>Retention Growth:</strong>
        <ul className="ml-4 text-sm space-y-1">
          <li>🎧 Returning listeners increased by <span className="text-green-400 font-semibold">X%</span>.</li>
          <li>📊 New listener conversion rate improved by <span className="text-blue-400 font-semibold">Y%</span>.</li>
        </ul>
      </li>

      <li>🕒 <strong>Listening Patterns:</strong>
        <ul className="ml-4 text-sm space-y-1">
          <li>⏰ Peak retention hours: <span className="text-blue-400 font-semibold">9 AM - 11 AM</span>.</li>
          <li>📅 Highest drop-off on <span className="text-yellow-400 font-semibold">Weekdays</span>.</li>
        </ul>
      </li>

      <li>⚡ <strong>Actionable Steps:</strong>
        <ul className="ml-4 text-sm space-y-1">
          <li>🎯 Shorter episodes lead to better retention rates.</li>
          <li>📢 Engaging intro segments improve listener stickiness.</li>
        </ul>
      </li>
    </ul>

    
    <table className="mt-8 w-full text-gray-400 border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th className="text-left pb-2">Month</th>
          <th className="text-center pb-2">Returning</th>
          <th className="text-center pb-2">New</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">April</td>
          <td className="text-center px-3">78% ⬆</td>
          <td className="text-center px-3 rounded-r-lg">22% ⬆</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">May</td>
          <td className="text-center px-3">82% ⬆</td>
          <td className="text-center px-3 rounded-r-lg">18% ⬇</td>
        </tr>
        <tr className="bg-gray-900 bg-opacity-70 rounded-lg">
          <td className="py-2 px-3 rounded-l-lg">June</td>
          <td className="text-center px-3">85% ⬆</td>
          <td className="text-center px-3 rounded-r-lg">15% ⬇</td>
        </tr>
      </tbody>
    </table>
  </div>

</section>


<section className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md hover:shadow-lg transition mb-12 mt-24">
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

      <section className="bg-gray-900 bg-opacity-70 p-6 rounded-3xl shadow-md mt-12">
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