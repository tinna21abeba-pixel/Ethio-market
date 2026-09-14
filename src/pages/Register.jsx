import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);

    if (formData.role === "seller") {
      navigate("/seller");
    } else {
      navigate("/shop");
    }
  };

  return (
    <main className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Promo */}
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
              Join Our Global Marketplace
            </h2>
            <p className="text-sm text-emerald-200/90 leading-relaxed">
              Whether you are an authentic Ethiopian producer looking to sell worldwide or a shopper seeking genuine Ethiopian treasures.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 text-xs text-emerald-300">
            🇪🇹 Handcrafted with pride • Shipped globally
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Start buying or selling authentic Ethiopian goods today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name / Brand Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Almaz Bekele / Sidama Coffee Co."
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                I want to *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: "buyer" }))}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition ${
                    formData.role === "buyer"
                      ? "bg-emerald-50 border-emerald-600 text-emerald-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🛍️ Buy Products
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: "seller" }))}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition ${
                    formData.role === "seller"
                      ? "bg-emerald-50 border-emerald-600 text-emerald-800"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🏪 Sell Products
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition duration-200"
              >
                Create Account &rarr;
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-gray-500 pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
