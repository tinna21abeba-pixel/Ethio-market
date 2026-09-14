import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, subtotal } = useCart();
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md mx-auto shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500 mb-6">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">Checkout Review</h1>
        <Link to="/cart" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
          &larr; Return to Cart
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
          Order Summary ({cart.reduce((s, i) => s + (i.quantity || 1), 0)} items)
        </h2>

        <div className="divide-y divide-gray-100">
          {cart.map((product) => {
            const qty = product.quantity || 1;
            const itemTotal = (product.price || 0) * qty;

            return (
              <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{product.name}</h4>
                    <span className="text-[11px] text-gray-400">
                      Qty: {qty} &times; ${product.price}.00
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-gray-900">${itemTotal}.00</span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">${subtotal}.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-bold text-gray-900">${shipping}.00</span>
          </div>
          <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${total}.00</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            to="/checkout/shipping"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-center text-xs shadow-md transition"
          >
            Continue to Shipping &rarr;
          </Link>
          <Link
            to="/cart"
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-center text-xs font-semibold transition"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Checkout;