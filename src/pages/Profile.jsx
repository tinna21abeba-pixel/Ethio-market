import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function Profile() {
  const { user, logOut, logout } = useAuth();
  const { orders } = useOrders();
  const handleLogout = logout || logOut;

  const [activeTab, setActiveTab] = useState("account");
  const [profileForm, setProfileForm] = useState({
    fullName: user?.name || "Abebe Kebede",
    email: user?.email || "abebe@gmail.com",
    phone: "+251 91 123 4567",
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const buyerOrders = orders.filter(
    (order) =>
      (user?.email && order.buyerEmail?.toLowerCase() === user.email.toLowerCase()) ||
      (user?.name && order.buyer?.toLowerCase() === user.name.toLowerCase()) ||
      (user?.id && order.buyerId === user.id)
  );

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Please Sign In</h2>
          <p className="text-xs text-gray-500">Sign in to view and manage your marketplace profile.</p>
          <Link
            to="/login"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Sign In Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-xs text-gray-500">Manage your personal settings, addresses, and order history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Summary & Navigation Sidebar matching Mockup Screen 9 */}
        <div className="md:col-span-1 space-y-6">
          {/* User Badge Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xl flex items-center justify-center border-2 border-emerald-300 shadow-xs flex-shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate">
                {user.name}
              </h2>
              <span className="text-xs text-gray-400 block truncate">
                {user.email}
              </span>
              <span className="inline-block mt-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {user.role === "seller" ? "Merchant Account" : "Marketplace Shopper"}
              </span>
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden divide-y divide-gray-100 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                activeTab === "account"
                  ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>👤</span>
              <span>Account Information</span>
            </button>

            <Link
              to="/orders"
              className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span>📦</span>
                <span>Order History</span>
              </div>
              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                {buyerOrders.length}
              </span>
            </Link>

            {user.role === "seller" && (
              <Link
                to="/seller"
                className="w-full flex items-center gap-3 px-4 py-3 text-emerald-700 hover:bg-emerald-50 transition"
              >
                <span>🏪</span>
                <span>Seller Hub & Inventory</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left transition"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Right Column: Account Information Form matching Mockup Screen 9 */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                Account Information
              </h2>
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ✓ Changes Saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
