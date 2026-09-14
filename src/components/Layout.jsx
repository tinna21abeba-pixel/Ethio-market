import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  🌿
                </div>
                <span className="text-lg font-bold text-gray-900">
                  Ethio<span className="text-emerald-600">Market</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connecting authentic Ethiopian farmers, artisans, and sellers with global shoppers worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Shop
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/shop" className="hover:text-emerald-600 transition">All Products</Link></li>
                <li><Link to="/shop" className="hover:text-emerald-600 transition">Ethiopian Coffee</Link></li>
                <li><Link to="/shop" className="hover:text-emerald-600 transition">Spices & Seasoning</Link></li>
                <li><Link to="/shop" className="hover:text-emerald-600 transition">Traditional Handicrafts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Sell with Us
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/seller" className="hover:text-emerald-600 transition">Seller Dashboard</Link></li>
                <li><Link to="/seller/add-product" className="hover:text-emerald-600 transition">List Products</Link></li>
                <li><Link to="/seller/orders" className="hover:text-emerald-600 transition">Order Fulfillment</Link></li>
                <li><Link to="/register" className="hover:text-emerald-600 transition">Become a Verified Seller</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Customer Care
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/orders" className="hover:text-emerald-600 transition">Track Your Order</Link></li>
                <li><Link to="/cart" className="hover:text-emerald-600 transition">Shopping Cart</Link></li>
                <li><Link to="/profile" className="hover:text-emerald-600 transition">Account Profile</Link></li>
                <li className="text-emerald-700 font-medium pt-1">🚚 Worldwide Air Express Shipping</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© {new Date().getFullYear()} EthioMarket Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-600 cursor-pointer">Authenticity Guarantee</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;