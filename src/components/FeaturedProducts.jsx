import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const { products } = useProducts();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-xs text-gray-500">Handpicked specialties directly from Ethiopian sellers</p>
        </div>
        <Link
          to="/shop"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>View all</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
