import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="space-y-6">
      {/* Main Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white">
        {/* Background Overlay Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />

        <div className="relative z-10 max-w-3xl px-6 py-16 sm:px-12 sm:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <span>✨ Direct from Ethiopian Artisans & Roasters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Connecting Ethiopian Sellers with Global Buyers
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 max-w-xl leading-relaxed">
            Authentic Ethiopian products. Real people. Global opportunities. Explore specialty single-origin coffee, handcrafted textiles, and heritage spices.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/shop"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition duration-200 flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Explore Products</span>
              <span>&rarr;</span>
            </Link>

            <Link
              to="/seller"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-5 py-3 rounded-xl transition text-sm sm:text-base flex items-center gap-2"
            >
              <span>▶ Watch Our Story</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Trust Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Authentic Products</h4>
            <p className="text-xs text-gray-500">100% genuine Ethiopian heritage goods</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
            🤝
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Trusted Sellers</h4>
            <p className="text-xs text-gray-500">Verified local producers and cooperatives</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
            ✈️
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Global Shipping</h4>
            <p className="text-xs text-gray-500">From Ethiopia straight to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;