import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState("All");

  const buyerOrders = orders.filter(
    (order) =>
      (user?.email && order.buyerEmail?.toLowerCase() === user.email.toLowerCase()) ||
      (user?.name && order.buyer?.toLowerCase() === user.name.toLowerCase()) ||
      (user?.id && order.buyerId === user.id)
  );

  const filteredOrders = buyerOrders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "shipped":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "processing":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const d = new Date(dateString);
      return isNaN(d.getTime())
        ? "Recently"
        : d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    } catch {
      return "Recently";
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-gray-500">Track and manage your Ethiopian marketplace orders</p>
        </div>
        <Link
          to="/shop"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 self-start sm:self-auto"
        >
          + Continue Shopping
        </Link>
      </div>

      {/* Filter Tabs matching mockup Screen 6 */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilterStatus(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === tab
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab === "All" ? "All Orders" : tab}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            📦
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">No Orders Found</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            You don't have any orders under "{filterStatus}".
          </p>
          <Link
            to="/shop"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Explore Ethiopian Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 hover:border-gray-300 transition"
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-gray-900">
                    #EM{order.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    Placed on {formatDate(order.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    ● {order.status || "Processing"}
                  </span>
                  <span className="text-sm font-black text-gray-900">
                    ${order.total}.00
                  </span>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item.imageUrl ||
                          "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-gray-500 block">
                        Qty: {item.quantity || 1} &times; ${item.price}.00
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Footer */}
              {order.shippingAddress && (
                <div className="pt-2 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between border-t border-gray-100 gap-1">
                  <span>
                    <strong>Ship To:</strong> {order.shippingAddress.fullName || order.buyer} (
                    {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country})
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    Estimated Transit: 7–14 Days
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;