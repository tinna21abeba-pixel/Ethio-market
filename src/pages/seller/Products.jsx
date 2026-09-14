import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

function Products() {
  const { products, deleteProduct } = useProducts();
  const { user } = useAuth();

  const isSellerProduct = (product) => {
    if (!user) return false;
    return (
      (user.id && product.sellerId === user.id) ||
      (user.name && product.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && product.sellerId === user.email)
    );
  };

  const sellerProducts = products.filter(isSellerProduct);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            My Product Inventory
          </h1>
          <p className="text-xs text-gray-500">
            Manage your store catalog and product listings ({sellerProducts.length} items)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/seller/add-product"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            + Add New Product
          </Link>
          <Link
            to="/seller"
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            📦
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-1">No products listed yet</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            Start selling authentic Ethiopian goods by creating your first product listing.
          </p>
          <Link
            to="/seller/add-product"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            + List a Product Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sellerProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-gray-300 transition"
            >
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                <img
                  src={
                    product.imageUrl ||
                    "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {product.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    📍 {product.origin || product.location || "Ethiopia"}
                  </p>
                  <p className="text-base font-extrabold text-gray-900 mt-2">
                    ${product.price}.00
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs font-semibold text-gray-600 hover:text-emerald-700"
                  >
                    View in Shop &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete "${product.name}"?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;