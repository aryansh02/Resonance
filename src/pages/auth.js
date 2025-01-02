import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/podcast-listing");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/podcast-listing");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/podcast-listing");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        background: "linear-gradient(0deg, #000000, #FFFFFF, #000000)",
        backgroundSize: "200% 200%",
        animation: "bounceGradientAnimation 12s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes bounceGradientAnimation {
          0% {
            background-position: 0% 100%;
          }
          50% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>

      <div className="w-full max-w-md bg-black bg-opacity-90 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {isLogin ? "Login to your account" : "Create an account"}
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          {isLogin
            ? "Enter your email and password to login"
            : "Enter your email below to create your account"}
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200"
          >
            <Image
              src="/Google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Google
          </button>
        </div>

        <div className="flex items-center my-6">
          <span className="flex-grow border-t border-gray-600"></span>
          <span className="px-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <span className="flex-grow border-t border-gray-600"></span>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition"
          disabled={loading}
        >
          {isLogin ? "Login" : "Create account"}
        </button>

        <p className="text-gray-400 mt-6 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 cursor-pointer underline hover:text-blue-600"
          >
            {isLogin ? "Create one" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
