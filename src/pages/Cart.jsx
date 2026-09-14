import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();
  const shipping = cart.length > 0 ? 5 : 0;
  const grandTotal = subtotal + shipping;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Your Cart{" "}
          <span className="text-base font-normal text-gray-500">
            ({cartCount} items)
          </span>
        </h1>
        <Link
          to="/shop"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>&larr;</span>
          <span>Continue Shopping</span>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            Looks like you haven't added any authentic Ethiopian products to your shopping cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((product) => {
              const qty = product.quantity || 1;
              const itemTotal = (product.price || 0) * qty;

              return (
                <div
                  key={product.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4 sm:gap-6"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <img
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-bold text-gray-900 hover:text-emerald-700 truncate block transition"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.category} • {product.seller || "Verified Seller"}
                    </p>
                    <p className="text-xs font-semibold text-gray-700 mt-1">
                      ${product.price}.00 each
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, qty - 1)}
                      className="w-7 h-7 rounded bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-gray-900">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, qty + 1)}
                      className="w-7 h-7 rounded bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-black text-gray-900">
                      ${itemTotal}.00
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 sticky top-24">
              <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-bold text-gray-900">${shipping}.00</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-xl font-black text-gray-900">
                  ${grandTotal}.00
                </span>
              </div>

              <Link
                to="/checkout/shipping"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 text-sm"
              >
                Proceed to Checkout &rarr;
              </Link>

              <div className="text-center pt-2">
                <span className="text-[11px] text-gray-400">
                  🔒 256-bit Encrypted Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;