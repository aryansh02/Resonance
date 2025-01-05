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
    router.push("/bookmarks"); // Redirect to the Bookmarks page
  };

  return user ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Welcome, {user.email}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 rounded-3xl hover:bg-red-700"
        >
          Log Out
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <p className="text-gray-400">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-400 mt-2">
              <span className="font-semibold">Subscription:</span> Free Plan
            </p>
          </div>
          <button className="mt-4 px-4 py-2 bg-yellow-600 rounded-3xl hover:bg-yellow-700">
            Upgrade
          </button>
        </div>

        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-400">Update your account preferences.</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 rounded-3xl hover:bg-blue-700">
            Manage Settings
          </button>
        </div>

        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <p className="text-gray-400">Customize your app experience.</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-600 rounded-3xl hover:bg-green-700">
            Edit Preferences
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Explore Podcasts</h3>
            <p className="text-gray-400 mt-2">Discover trending podcasts.</p>
          </div>
          <button className="mt-4 px-4 py-2 bg-purple-600 rounded-3xl hover:bg-purple-700">
            Go
          </button>
        </div>
        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Bookmarks</h3>
            <p className="text-gray-400 mt-2">
              View and manage your saved content.
            </p>
          </div>
          <button
            onClick={openBookmarks}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-3xl hover:bg-indigo-700"
          >
            Open
          </button>
        </div>
        <div className="p-6 bg-black rounded-xl shadow-md hover:shadow-lg transition h-56 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Help & Support</h3>
            <p className="text-gray-400 mt-2">
              Get assistance with your account.
            </p>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-600 rounded-3xl hover:bg-red-700">
            Contact Us
          </button>
        </div>
      </section>

      <footer className="bg-semi-transparent text-white text-center mt-24 pt-8 pb-8">
        <p className="text-lg">Developed by Aryansh</p>
        <p className="mt-6">© 2024 Resonance. All rights reserved.</p>
        <div className="mt-6 flex justify-center gap-4">
          <p>About</p>
          <p>Contact</p>
          <p>Privacy Policy</p>
        </div>
      </footer>
    </div>
  ) : null;
};

export default Dashboard;
