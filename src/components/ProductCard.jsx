import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition duration-200 flex flex-col group">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1447933601403-0c6688de566e";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-emerald-50 text-emerald-600">
            🌿
          </div>
        )}

        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-emerald-100">
          {product.category || "Authentic"}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <span>📍 {product.origin || product.location || "Ethiopia"}</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating Mockup */}
          <div className="flex items-center gap-1 text-xs text-amber-500 mt-1 mb-2">
            <span>★</span>
            <span className="font-bold text-gray-700">4.8</span>
            <span className="text-gray-400">({(product.id * 17) % 80 + 20})</span>
          </div>

          {product.seller && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-3">
              By <span className="font-medium text-gray-700">{product.seller}</span>
            </p>
          )}
        </div>

        {/* Bottom Price and Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Price</span>
            <span className="text-base font-extrabold text-gray-900">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/product/${product.id}`}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 px-2.5 rounded-lg font-bold text-xs shadow-xs transition flex items-center gap-1"
              title="Add to Cart"
            >
              <span>+</span>
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;