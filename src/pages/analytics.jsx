import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { Bar, Pie, Line } from "react-chartjs-2";

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

const Analytics = () => {
  const router = useRouter();
  const { id } = router.query;
  const [validAccess, setValidAccess] = useState(false);

  useEffect(() => {
    if (!id) {
      // Redirect to the access form if no smartLinkId
      router.push("/analyticsAccess");
    } else {
      // Simulate validation for now
      setValidAccess(true);
    }
  }, [id, router]);

  if (!validAccess) {
    return null; // Prevent rendering until access is verified
  }

  // Existing data and options
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

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Listener Growth",
      },
    },
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
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Podcast Categories",
      },
    },
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Engagement (minutes)",
        data: [200, 300, 250, 400],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Engagement Trend",
      },
    },
  };

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        background: "linear-gradient(90deg, #03071E, #370617, #6A040F, #9D0208, #D00000, #DC2F02, #E85D04, #F48C06, #FAA307, #FFBA08)",
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
        <h1 className="text-4xl font-semi-bold">Analytics</h1>
      </header>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Total Listeners</h2>
          <p className="text-3xl font-extrabold text-blue-400">500K</p>
        </div>
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Total Engagement</h2>
          <p className="text-3xl font-extrabold text-green-400">1200H</p>
        </div>
        <div className="p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Top Category</h2>
          <p className="text-3xl font-extrabold text-yellow-400">Education</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4">Monthly Listener Growth</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4">Podcast Categories</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-4">Weekly Engagement Trend</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-200">
        <p>&copy; 2024 Resonance. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Analytics;