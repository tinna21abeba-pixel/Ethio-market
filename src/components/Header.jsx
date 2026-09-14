import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { cartCount } = useCart();
  const { user, logOut, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (logout) logout();
    else if (logOut) logOut();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isSeller = user?.role === "seller";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-base sm:text-lg shadow-xs group-hover:bg-emerald-700 transition">
              🌿
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              Ethio<span className="text-emerald-600">Market</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
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
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg transition ${
                  isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg transition ${
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
                  `text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg transition ${
                    isActive ? "text-emerald-700 bg-emerald-50" : "text-gray-600 hover:text-emerald-600"
                  }`
                }
              >
                Seller Hub
              </NavLink>
            ) : (
              <NavLink
                to="/seller"
                className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-emerald-600 px-2.5 py-1.5 transition"
              >
                Sell
              </NavLink>
            )}

            {user && !isSeller && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold px-2.5 py-1.5 rounded-lg transition ${
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
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-bold text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <Link
                  to={isSeller ? "/seller/profile" : "/profile"}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
                  title="View Profile"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs sm:text-sm border border-emerald-300">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden lg:inline text-xs font-semibold text-gray-700">
                    {user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-600 px-2 py-1.5 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full shadow-xs transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Right Controls: Cart + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition"
              aria-label="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-3 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products, spices, coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
            </form>

            <div className="flex flex-col space-y-1 text-xs font-bold">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-emerald-50 text-emerald-800 font-extrabold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                🏠 Home
              </NavLink>

              <NavLink
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-emerald-50 text-emerald-800 font-extrabold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                🛍️ Shop Products
              </NavLink>

              {isSeller ? (
                <NavLink
                  to="/seller"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-emerald-50 text-emerald-800 font-extrabold" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  🏪 Seller Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/seller"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  ✨ Become a Seller
                </NavLink>
              )}

              {user && !isSeller && (
                <NavLink
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-emerald-50 text-emerald-800 font-extrabold" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  📦 My Orders
                </NavLink>
              )}

              {user && (
                <NavLink
                  to={isSeller ? "/seller/profile" : "/profile"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  👤 Account Profile ({user.name})
                </NavLink>
              )}
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  🚪 Sign Out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 border border-gray-200 text-gray-800 text-xs font-bold rounded-xl hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-xs"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;