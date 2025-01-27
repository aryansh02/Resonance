import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  const openBookmarks = () => {
    router.push("/bookmarks");
  };

  return user ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold">Welcome, {user.email}</h1>
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </header>

      {/* User Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">Bookmarks</h3>
          <p className="text-3xl font-extrabold">12</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">Hours Listened</h3>
          <p className="text-3xl font-extrabold">34</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg text-center hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">Podcasts Played</h3>
          <p className="text-3xl font-extrabold">56</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Account Information */}
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <p className="text-gray-400">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-400 mt-2">
              <span className="font-semibold">Subscription:</span> Free Plan
            </p>
          </div>
          <button className="mt-4 px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700 transition">
            Upgrade
          </button>
        </div>

        {/* Settings */}
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-400">Update your account preferences.</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-600 rounded-full hover:bg-green-700 transition">
            Manage Settings
          </button>
        </div>

        {/* Bookmarks */}
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Bookmarks</h2>
            <p className="text-gray-400">View and manage your saved content.</p>
          </div>
          <button
            onClick={openBookmarks}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
          >
            Open
          </button>
        </div>

        {/* Help & Support */}
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
            <p className="text-gray-400">Get assistance with your account.</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-24 pt-8 pb-4 border-t border-gray-700">
        <p className="text-lg font-semibold">Developed by Aryansh</p>
        <p className="text-gray-400 mt-2">
          © 2024 Resonance. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:underline text-gray-400">
            About
          </a>
          <a href="#" className="hover:underline text-gray-400">
            Contact
          </a>
          <a href="#" className="hover:underline text-gray-400">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  ) : null;
};

export default Dashboard;
