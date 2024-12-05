import React from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-transparent backdrop-blur-lg z-50 p-4">
        <nav className="flex items-center justify-between px-8">
          {/* Logo */}
          <div
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Bungee Spice', cursive" }}
          >
            <a href="/">Resonance</a>
          </div>

          {/* Navbar Links */}
          <div
            className="flex items-center gap-6"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <a href="/podcast-listing" className="text-white hover:underline">
              Podcasts
            </a>
            <a href="/charts" className="text-white hover:underline">
              Charts
            </a>
            <a href="/dashboard" className="text-white hover:underline">
              Dashboard
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
