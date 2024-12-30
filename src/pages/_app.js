import React from "react";
import "../styles/globals.css";
import Link from "next/link";
import { AuthProvider, useAuth } from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <main className="pt-20" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

function Header() {
  const { user } = useAuth(); // Removed logout as it is no longer required in the header

  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-lg z-50 p-4">
      <nav className="flex items-center justify-between px-8">
        {/* Logo */}
        <div
          className="text-3xl font-bold text-white"
          style={{ fontFamily: "'Bungee Spice', cursive" }}
        >
          <Link href="/">Resonance</Link>
        </div>

        {/* Navigation Links */}
        <div
          className="flex items-center gap-6"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          {user ? (
            <>
              <Link
                href="/podcast-listing"
                className="text-white font-bold text-xl hover:underline"
              >
                Podcasts
              </Link>
              <Link
                href="/charts"
                className="text-white font-bold text-xl hover:underline"
              >
                Charts
              </Link>
              <Link
                href="/analytics"
                className="text-white font-bold text-xl hover:underline"
              >
                Analytics
              </Link>
              <Link
                href="/dashboard"
                className="text-white font-bold text-xl hover:underline"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/auth"
              className="text-white font-bold text-xl hover:underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
