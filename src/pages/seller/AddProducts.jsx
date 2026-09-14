import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Coffee",
    description: "",
    seller: user?.name || "",
    origin: "Yirgacheffe, Ethiopia",
    stock: "50",
    imageUrl: "",
  });

  useEffect(() => {
    if (user?.name && !product.seller) {
      setProduct((prev) => ({ ...prev, seller: user.name }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock) || 30,
      seller: product.seller || user?.name || "Verified Seller",
      sellerId: user?.id || user?.email || `seller_${Date.now()}`,
      location: product.origin,
    });

    navigate("/seller/products");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Add New Product Listing
          </h1>
          <p className="text-xs text-gray-500">
            Showcase your authentic Ethiopian specialty goods to buyers globally
          </p>
        </div>
        <Link
          to="/seller/products"
          className="text-xs font-bold text-gray-600 hover:text-emerald-700"
        >
          &larr; Back to Inventory
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Ethiopian Yirgacheffe Washed Grade 1"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Price ($ USD) *
              </label>
              <input
                type="number"
                name="price"
                min="1"
                step="0.01"
                placeholder="18.00"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              >
                <option value="Coffee">Coffee</option>
                <option value="Honey">Honey</option>
                <option value="Spices">Spices</option>
                <option value="Grains">Grains</option>
                <option value="Food">Food</option>
                <option value="Clothing">Clothing & Textiles</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Leather">Leather</option>
                <option value="Seeds">Seeds</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Initial Stock Units
              </label>
              <input
                type="number"
                name="stock"
                placeholder="50"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Seller / Brand Name *
              </label>
              <input
                type="text"
                name="seller"
                value={product.seller}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Origin / Region *
              </label>
              <input
                type="text"
                name="origin"
                placeholder="e.g. Sidama, Ethiopia"
                value={product.origin}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Product Story & Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the unique tasting notes, traditional harvest methods, and artisan craftsmanship..."
              value={product.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs shadow-md transition"
            >
              Publish Product Listing &rarr;
            </button>
            <button
              type="button"
              onClick={() => navigate("/seller/products")}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;