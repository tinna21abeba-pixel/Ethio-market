import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { cartCount } = useCart();
  const { user, logOut, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    if (logout) logout();
    else if (logOut) logOut();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isSeller = user?.role === "seller";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-emerald-700 transition">
              🌿
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Ethio<span className="text-emerald-600">Market</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative items-center"
          >
            <div className="absolute left-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for products, sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </form>

          {/* Navigation Links & Actions */}
          <nav className="flex items-center gap-1 sm:gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold px-3 py-2 rounded-md transition ${
                  isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-sm font-semibold px-3 py-2 rounded-md transition ${
                  isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                }`
              }
            >
              Shop
            </NavLink>

            {isSeller ? (
              <NavLink
                to="/seller"
                className={({ isActive }) =>
                  `text-sm font-semibold px-3 py-2 rounded-md transition ${
                    isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                  }`
                }
              >
                Seller Hub
              </NavLink>
            ) : (
              <NavLink
                to="/seller"
                className="text-sm font-semibold text-gray-600 hover:text-emerald-600 px-3 py-2 transition"
              >
                Sell
              </NavLink>
            )}

            {user && !isSeller && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-sm font-semibold px-3 py-2 rounded-md transition ${
                    isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                  }`
                }
              >
                My Orders
              </NavLink>
            )}

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition flex items-center"
              aria-label="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <Link
                  to={isSeller ? "/seller/profile" : "/profile"}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition"
                  title="View Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-300">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold text-gray-700">
                    {user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-600 px-2.5 py-1.5 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;