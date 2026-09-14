import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";

function SellerOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();

  const isSellerItem = (item) => {
    if (!user) return false;
    return (
      (user.id && item.sellerId === user.id) ||
      (user.name && item.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && item.sellerId === user.email)
    );
  };

  const sellerOrders = orders.filter((order) =>
    order.items?.some(isSellerItem)
  );

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
    if (!dateString) return "Recent";
    try {
      const d = new Date(dateString);
      return isNaN(d.getTime())
        ? "Recent"
        : d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    } catch {
      return "Recent";
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Customer Order Fulfillment
          </h1>
          <p className="text-xs text-gray-500">
            Manage incoming orders and update delivery status ({sellerOrders.length} orders)
          </p>
        </div>
        <Link
          to="/seller"
          className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition"
        >
          &larr; Seller Dashboard
        </Link>
      </div>

      {sellerOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            🚚
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">No Orders Yet</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            When buyers place orders for your products, they will appear here for processing and fulfillment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sellerOrders.map((order) => {
            const sellerProducts = order.items.filter(isSellerItem);
            const sellerOrderTotal = sellerProducts.reduce(
              (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
              0
            );

            return (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-gray-900">
                      #EM{order.id}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    ● {order.status || "Pending"}
                  </span>
                </div>

                {/* Buyer and Shipping Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-900 block mb-0.5">
                      Customer Info
                    </span>
                    <p>Name: {order.buyer || "Guest"}</p>
                    <p>Email: {order.buyerEmail}</p>
                  </div>
                  {order.shippingAddress && (
                    <div>
                      <span className="font-bold text-gray-900 block mb-0.5">
                        Shipping Destination
                      </span>
                      <p>
                        {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.country}
                      </p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                  )}
                </div>

                {/* Seller's Products in this order */}
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-2">
                    Your Products in this Order:
                  </h4>
                  <div className="space-y-2">
                    {sellerProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50"
                      >
                        <span className="text-gray-800 font-medium">
                          {p.name} &times; {p.quantity || 1}
                        </span>
                        <span className="font-bold text-gray-900">
                          ${(p.price || 0) * (p.quantity || 1)}.00
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right pt-2 text-xs">
                    <span className="text-gray-500">Your Store Revenue: </span>
                    <strong className="text-emerald-700 font-black text-sm">
                      ${sellerOrderTotal}.00
                    </strong>
                  </div>
                </div>

                {/* Status Updater Buttons */}
                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-700 mr-2">
                    Set Status:
                  </span>
                  {["Pending", "Processing", "Shipped", "Delivered"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateOrderStatus(order.id, st)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                        order.status === st
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateOrderStatus(order.id, "Cancelled")}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                      order.status === "Cancelled"
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white border-red-200 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default SellerOrders;