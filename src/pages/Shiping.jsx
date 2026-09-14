import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Shipping() {
  const { cart, clearCart, subtotal } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    country: "Ethiopia",
    address: "",
    city: "Addis Ababa",
    postalCode: "1000",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      navigate("/shop");
      return;
    }

    const shippingFee = cart.length > 0 ? 5 : 0;
    const total = subtotal + shippingFee;

    const newOrder = createOrder({
      buyer: user ? user.name : formData.fullName,
      buyerEmail: user ? user.email : formData.email,
      buyerId: user?.id || user?.email || `buyer_${Date.now()}`,
      shippingAddress: formData,
      items: cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })),
      subtotal,
      shipping: shippingFee,
      total,
    });

    clearCart();
    navigate("/order-confirmation", { state: { orderId: newOrder?.id } });
  };

  const shippingFee = cart.length > 0 ? 5 : 0;
  const grandTotal = subtotal + shippingFee;

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
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 3-Step Breadcrumb Bar */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 max-w-md mx-auto">
        <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
            1
          </span>
          <span>Shipping</span>
        </div>
        <span className="text-gray-300">&mdash;&mdash;</span>
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
            2
          </span>
          <span>Payment</span>
        </div>
        <span className="text-gray-300">&mdash;&mdash;</span>
        <div className="flex items-center gap-1.5 text-gray-400">
          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
            3
          </span>
          <span>Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <h1 className="text-xl font-bold text-gray-900">Shipping Information</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Abebe Kebede"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 91 234 5678"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                >
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="International">Other (International)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address, House / Apt Number"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Addis Ababa, New York"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="1000"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition duration-200 text-sm"
                >
                  Place Order • ${grandTotal}.00
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 sticky top-24">
            <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
              Order Summary ({cart.length} items)
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-gray-400 block">
                      Qty: {item.quantity || 1} &times; ${item.price}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 flex-shrink-0">
                    ${(item.price || 0) * (item.quantity || 1)}.00
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">${shippingFee}.00</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-gray-900">
                ${grandTotal}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shipping;