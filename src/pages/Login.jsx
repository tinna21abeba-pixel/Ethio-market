import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("Invalid email or password. Try demo accounts below.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (savedUser.role === "seller") {
      navigate("/seller");
    } else {
      navigate("/shop");
    }
  };

  return (
    <main className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Authentic Ethiopian Landscape Promo */}
        <div className="relative bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 p-8 sm:p-12 text-white flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />

          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
              🌿
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              Ethio<span className="text-emerald-400">Market</span>
            </span>
          </div>

          <div className="relative z-10 space-y-4 my-8">
            <h2 className="text-3xl font-extrabold leading-tight">
              Welcome Back!
            </h2>
            <p className="text-sm text-emerald-200/90 leading-relaxed">
              Sign in to continue your journey with genuine Ethiopian single-origin coffee, handcrafted goods, and traditional spices.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 text-xs text-emerald-300">
            🌱 Supporting 500+ local Ethiopian family farmers & artisans
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Login
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">
                  Password
                </label>
                <span className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] text-gray-400 uppercase font-bold relative">
                Or
              </span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("bunahouse@ethiomarket.com");
                  setPassword("password123");
                }}
                className="w-full py-2 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition"
              >
                <span>☕</span>
                <span>Demo Seller (Buna House)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("abebe@gmail.com");
                  setPassword("password123");
                }}
                className="w-full py-2 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition"
              >
                <span>👤</span>
                <span>Demo Buyer (Abebe)</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;