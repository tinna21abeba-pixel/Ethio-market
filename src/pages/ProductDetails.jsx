import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            🌿
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-sm text-gray-500 mb-6">
            The item you are searching for may have been removed or is unavailable.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link to="/" className="hover:text-emerald-600 transition">
          Home
        </Link>
        <span>&gt;</span>
        <Link to="/shop" className="hover:text-emerald-600 transition">
          Shop
        </Link>
        <span>&gt;</span>
        <span className="hover:text-emerald-600 transition">{product.category}</span>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Image Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-emerald-50 text-emerald-600">
                  🌿
                </div>
              )}
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-800 text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-emerald-100">
                {product.category}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {[product.imageUrl, "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"]
                .filter(Boolean)
                .map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="w-20 h-20 rounded-lg overflow-hidden border-2 border-emerald-500 flex-shrink-0 bg-gray-50 focus:outline-none"
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500 text-sm">
                    {"★★★★★"}
                  </div>
                  <span className="text-xs font-bold text-gray-800">4.8</span>
                  <span className="text-xs text-gray-400">
                    ({(product.id * 17) % 80 + 20} customer reviews)
                  </span>
                </div>
              </div>

              {/* Price & Stock status */}
              <div className="flex items-baseline gap-4 pt-2 border-t border-gray-100">
                <span className="text-3xl font-black text-gray-900">
                  ${product.price}.00
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  ✓ In stock ({product.stock || 45} available)
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  📍 {product.origin || product.location || "Ethiopia"}
                </span>
              </div>

              {/* Verified Seller Box */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {product.seller ? product.seller.charAt(0) : "S"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      Sold by: {product.seller || "Authentic Merchant"}
                    </h4>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      ✓ Verified Ethiopian Producer
                    </span>
                  </div>
                </div>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  View Store &rarr;
                </Link>
              </div>

              {/* Description Snippet */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description ||
                  "Experience the rich and aromatic flavor of authentic Ethiopian specialty products. Sourced directly from verified producers and cooperatives."}
              </p>
            </div>

            {/* Quantity Stepper & Add to Cart Action */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    added
                      ? "bg-emerald-800 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  <span>🛒</span>
                  <span>{added ? "✓ Added to Cart!" : `Add to Cart • $${product.price * quantity}.00`}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-xl border transition ${
                    isWishlist
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-gray-50 border-gray-200 text-gray-400 hover:text-red-500"
                  }`}
                  title="Save to Wishlist"
                >
                  ♥
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-900">
                <span className="text-lg">🚚</span>
                <div>
                  <strong className="block font-bold">Estimated delivery: 7–14 business days</strong>
                  <span className="text-emerald-700">Ships directly from Ethiopia with end-to-end tracking.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Story Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex border-b border-gray-200 gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-sm font-bold transition border-b-2 ${
                activeTab === "description"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`pb-3 text-sm font-bold transition border-b-2 ${
                activeTab === "details"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Product Details & Origin
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold transition border-b-2 ${
                activeTab === "reviews"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Reviews (124)
            </button>
          </div>

          <div className="py-6 text-sm text-gray-600 leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  {product.description ||
                    "Experience the rich, authentic heritage of Ethiopia. Every product in this collection is harvested and produced following generational traditional practices."}
                </p>
                <p>
                  Handcrafted with meticulous care by verified local cooperatives, ensuring ethical trade and premium authentic standards for global buyers.
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase block">Origin</span>
                  <span className="font-bold text-gray-900">{product.origin || product.location || "Ethiopia"}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase block">Category</span>
                  <span className="font-bold text-gray-900">{product.category}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase block">Packaging</span>
                  <span className="font-bold text-gray-900">Vacuum Sealed Eco-Bag</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase block">Authenticity</span>
                  <span className="font-bold text-emerald-700">100% Genuine Certified</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-3xl">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Michael R. (Verified Buyer)</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    "Unbelievable quality and freshness! Arrived quickly from Addis Ababa and tastes amazing. Will definitely order again!"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;