import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrderContext";

function SellerProfile() {
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

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Merchant Profile
          </h1>
          <p className="text-xs text-gray-500">Store and verified seller credentials</p>
        </div>
        <Link
          to="/seller"
          className="text-xs font-bold text-gray-600 hover:text-emerald-700"
        >
          &larr; Seller Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
            <span className="text-xs text-gray-500">{user?.email}</span>
            <div className="mt-1">
              <span className="inline-block bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Verified Ethiopian Merchant
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200 text-xs">
          <div>
            <span className="text-gray-400 uppercase font-semibold block">Store Name</span>
            <strong className="text-gray-900 text-sm">{user?.name || "Buna House"}</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold block">Merchant Email</span>
            <strong className="text-gray-900 text-sm">{user?.email}</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold block">Listed Products</span>
            <strong className="text-gray-900 text-sm">{sellerProducts.length} Items</strong>
          </div>
          <div>
            <span className="text-gray-400 uppercase font-semibold block">Total Orders</span>
            <strong className="text-gray-900 text-sm">{sellerOrders.length} Orders</strong>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Link
            to="/seller/products"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-2.5 px-4 rounded-xl text-xs transition"
          >
            Manage Store Inventory
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl text-xs transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default SellerProfile;