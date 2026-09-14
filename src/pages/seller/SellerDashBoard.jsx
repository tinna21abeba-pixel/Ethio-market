import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrderContext";

function SellerDashboard() {
  const { user, logOut, logout } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();

  const handleLogout = logout || logOut;

  const isSellerItem = (item) => {
    if (!user) return false;
    return (
      (user.id && item.sellerId === user.id) ||
      (user.name && item.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && item.sellerId === user.email)
    );
  };

  const sellerProducts = products.filter(isSellerItem);
  const sellerOrders = orders.filter((order) =>
    order.items?.some(isSellerItem)
  );

  const totalProducts = sellerProducts.length;
  const totalOrders = sellerOrders.length;

  const totalSales = sellerOrders.reduce((sum, order) => {
    if (order.status === "Cancelled") return sum;
    const sellerItems = order.items.filter(isSellerItem);
    const orderSum = sellerItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    return sum + orderSum;
  }, 0);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[680px]">
        {/* Dark Modern Sidebar matching Mockup Screen 8 */}
        <aside className="lg:col-span-1 bg-slate-900 text-white p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-6 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                🌿
              </div>
              <span className="text-base font-extrabold tracking-tight">
                Ethio<span className="text-emerald-400">Merchant</span>
              </span>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <NavLink
                to="/seller"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <span>📊</span>
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/seller/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <span>📦</span>
                <span>Products ({totalProducts})</span>
              </NavLink>

              <NavLink
                to="/seller/orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <span>🚚</span>
                <span>Orders ({totalOrders})</span>
              </NavLink>

              <NavLink
                to="/seller/add-product"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <span>➕</span>
                <span>Add Product</span>
              </NavLink>

              <NavLink
                to="/seller/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                <span>👤</span>
                <span>Profile</span>
              </NavLink>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition"
            >
              <span>🚪</span>
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-gray-50/50 space-y-6">
          {/* Top Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                Welcome, {user?.name || "Merchant"}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/seller/add-product"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
              >
                + Add Product
              </Link>
            </div>
          </div>

          {/* 3 Metric Cards matching Mockup Screen 8 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Total Products
                </span>
                <span className="text-2xl font-black text-gray-900 block mt-1">
                  {totalProducts}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                📦
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Total Orders
                </span>
                <span className="text-2xl font-black text-gray-900 block mt-1">
                  {totalOrders}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                🛒
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase">
                  Total Sales
                </span>
                <span className="text-2xl font-black text-emerald-950 block mt-1">
                  ${totalSales.toFixed(2)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-xs">
                💰
              </div>
            </div>
          </div>

          {/* Analytics & Recent Orders Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Overview Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>
                <span className="text-[11px] text-gray-400">Last 7 Days</span>
              </div>

              {/* Sparkline simulation */}
              <div className="h-44 w-full flex items-end gap-3 pt-6 pb-2 px-2">
                {[45, 60, 30, 80, 65, 90, 75].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <div
                      className="w-full bg-emerald-500 group-hover:bg-emerald-600 rounded-t-md transition"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[10px] text-gray-400 font-medium">
                      Day {idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-100 text-gray-500">
                <span>Revenue Performance: <strong className="text-emerald-700">+18.4%</strong></span>
                <Link to="/seller/orders" className="text-emerald-600 font-bold hover:text-emerald-700">
                  Full Reports &rarr;
                </Link>
              </div>
            </div>

            {/* Recent Orders List Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
                <Link to="/seller/orders" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                  View all orders &rarr;
                </Link>
              </div>

              {sellerOrders.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  No orders received yet for your products.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sellerOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-900">
                          #EM{order.id}
                        </span>
                        <span className="text-[11px] text-gray-400 block">
                          Buyer: {order.buyer || "Customer"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900 block">
                          ${order.total}.00
                        </span>
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {order.status || "Processing"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SellerDashboard;