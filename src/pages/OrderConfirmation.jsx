import React from "react";
import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto font-black shadow-xs">
          ✓
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Order Confirmed!
          </h1>
          {orderId && (
            <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              Order ID: #{orderId}
            </span>
          )}
          <p className="text-xs text-gray-500 max-w-sm mx-auto pt-2 leading-relaxed">
            Thank you for supporting authentic Ethiopian farmers and merchants! Your order is being prepared and will be shipped with end-to-end tracking.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/orders"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition"
          >
            Track My Order &rarr;
          </Link>
          <Link
            to="/shop"
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl text-xs transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;