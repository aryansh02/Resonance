import React from "react";
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

const Dashboard = () => {
  return (
    <div className="p-8 mb-12 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Podcast Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
