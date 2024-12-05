import React from "react";
import "../styles/globals.css";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="fixed top-0 w-full bg-transparent backdrop-blur-lg z-50 p-4">
        <nav className="flex items-center justify-between px-8">
          <div
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Bungee Spice', cursive" }}
          >
            <Link href="/">Resonance</Link>
          </div>

          <div
            className="flex items-center gap-6"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <Link
              href="/podcast-listing"
              className="text-white hover:underline"
            >
              Podcasts
            </Link>
            <Link href="/charts" className="text-white hover:underline">
              Charts
            </Link>
            <Link href="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-20" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
