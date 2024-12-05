import React, { useState } from "react";
import Link from "next/link";

const LandingPage = () => {
  const [email, setEmail] = useState("");

  
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    
  };

  return (
    <div className="text-white min-h-screen">
      
      <header className="fixed top-0 w-full bg-black z-50 p-4 shadow-md">
        <nav className="flex items-center justify-between px-8">
          <div
            className="text-3xl font-bold"
            style={{ fontFamily: "'Bungee Spice', cursive" }}
          >
            <Link href="/">Resonance</Link>
          </div>
          <div className="flex gap-6 text-xl font-bold">
            <Link href="/podcast-listing" className="gradient-underline">
              Podcasts
            </Link>
            <Link href="/charts" className="gradient-underline">
              Charts
            </Link>
            <Link href="/dashboard" className="gradient-underline">
              Dashboard
            </Link>
          </div>
        </nav>
        <style jsx>{`
          .gradient-underline {
            position: relative;
            text-decoration: none;
            color: white;
            transition: color 0.3s ease;
          }

          .gradient-underline:hover {
            color: white; /* Ensures text remains white */
          }

          .gradient-underline::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, yellow, orange, red);
            transition: width 0.4s ease-in-out;
          }

          .gradient-underline:hover::after {
            width: 100%;
          }
        `}</style>
      </header>

      
      <div
        className="pt-16"
        style={{
          background: "linear-gradient(90deg, #03002e, #0b0194, #7502d9)",
          backgroundSize: "300% 300%",
          animation: "gradientAnimation 8s ease infinite",
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

          @keyframes textAnimation {
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

        
        <section className="flex items-center justify-center h-screen text-center">
          <div>
            <h1
              className="text-6xl font-bold mb-6 animate-pulse"
              style={{
                background: "linear-gradient(90deg, yellow, orange, red)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "textAnimation 4s ease infinite",
              }}
            >
              Coming Soon
            </h1>
            <p className="mt-10 text-lg text-gray-300 mb-8">
              AI-powered insights, analytics, and visualizations to transform your
              podcast growth.
            </p>
            <div>
              <Link href="/podcast-listing">
                <button className="mt-16 bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>

        
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2
              className="text-4xl font-bold mb-8"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div
                className="mt-12 p-16 bg-black bg-opacity-40 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-4">Unrivaled Insights</h3>
                <p className="text-gray-300">
                  Leverage cutting-edge AI to understand your audience and grow smarter.
                </p>
              </div>
              <div
                className="mt-12 p-16 bg-black bg-opacity-40 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-4">Refined Visuals</h3>
                <p className="text-gray-300">
                  Transform raw numbers into actionable visuals for faster decisions.
                </p>
              </div>
              <div
                className="mt-12 p-16 bg-black bg-opacity-40 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-4">Seamless Analytics</h3>
                <p className="text-gray-300">
                  Tools designed to make podcast analytics effortless.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="py-64">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Join the Community
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Enter your email to join our growing community of podcasters and
              stay ahead with exclusive insights.
            </p>
            <form
              className="flex justify-center gap-4"
              onSubmit={handleEmailSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-lg w-80 bg-gray-300 text-gray-400 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>

      <section className="py-4 text-center">
        <p className="text-sm text-gray-400">
          This is an MVP (Minimum Viable Product). Features and functionality are still in development.
        </p>
      </section>

      
      <footer className="bg-black text-white py-8 text-center">
        <p className="text-lg">Developed by Aryansh</p>
        <p className="mt-6">© 2024 Resonance. All rights reserved.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
