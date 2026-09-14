import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Product Image & Badges */}
        <Link to={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-100 overflow-hidden">
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
            <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl bg-emerald-50 text-emerald-600">
              🌿
            </div>
          )}

          <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-emerald-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-emerald-100 max-w-[85%] truncate">
            {product.category || "Authentic"}
          </span>
        </Link>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1 truncate">
            <span>📍</span>
            <span className="truncate">{product.origin || product.location || "Ethiopia"}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 sm:line-clamp-1 group-hover:text-emerald-700 transition leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
            <span>★</span>
            <span className="font-bold text-gray-700">4.8</span>
            <span className="text-gray-400 text-[10px]">({(product.id * 17) % 80 + 20})</span>
          </div>

          {product.seller && (
            <p className="text-[11px] text-gray-500 truncate mt-1">
              By <span className="font-medium text-gray-700">{product.seller}</span>
            </p>
          )}
        </div>
      </div>

      {/* Bottom Price and Actions */}
      <div className="p-3 sm:p-4 pt-0 sm:pt-0 mt-auto">
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-gray-400 block font-semibold leading-none">Price</span>
            <span className="text-sm sm:text-base font-black text-gray-900 leading-tight">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <Link
              to={`/product/${product.id}`}
              className="hidden sm:inline-block text-[11px] font-semibold px-2 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 px-2.5 rounded-lg font-bold text-[11px] sm:text-xs shadow-xs transition flex items-center gap-1"
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