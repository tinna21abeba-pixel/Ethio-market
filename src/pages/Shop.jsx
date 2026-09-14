import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Shop() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "All Categories";
  const urlSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [search, setSearch] = useState(urlSearch);
  const [priceRange, setPriceRange] = useState("all");
  const [region, setRegion] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "All Categories",
    "Coffee",
    "Honey",
    "Spices",
    "Grains",
    "Food",
    "Clothing",
    "Handicrafts",
    "Leather",
    "Seeds",
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All Categories" ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
          !search ||
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase()) ||
          product.seller?.toLowerCase().includes(search.toLowerCase()) ||
          product.origin?.toLowerCase().includes(search.toLowerCase());

        let matchesPrice = true;
        if (priceRange === "under20") matchesPrice = product.price < 20;
        else if (priceRange === "20to50") matchesPrice = product.price >= 20 && product.price <= 50;
        else if (priceRange === "over50") matchesPrice = product.price > 50;

        let matchesRegion = true;
        if (region === "ethiopia") {
          matchesRegion = !product.origin || product.origin.toLowerCase().includes("ethiopia");
        }

        return matchesCategory && matchesSearch && matchesPrice && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return b.id - a.id; // newest default
      });
  }, [products, selectedCategory, search, priceRange, region, sortBy]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All Categories") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Search Catalog</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
              />
              <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const count =
                  cat === "All Categories"
                    ? products.length
                    : products.filter(
                        (p) => p.category?.toLowerCase() === cat.toLowerCase()
                      ).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-emerald-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        selectedCategory === cat
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "all"}
                  onChange={() => setPriceRange("all")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>All Prices</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "under20"}
                  onChange={() => setPriceRange("under20")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Under $20</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "20to50"}
                  onChange={() => setPriceRange("20to50")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>$20 – $50</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === "over50"}
                  onChange={() => setPriceRange("over50")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>$50+</span>
              </label>
            </div>
          </div>

          {/* Origin Filter */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Country / Origin</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="region"
                  checked={region === "all"}
                  onChange={() => setRegion("all")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>All Regions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="region"
                  checked={region === "ethiopia"}
                  onChange={() => setRegion("ethiopia")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Origin: Ethiopia (Direct)</span>
              </label>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All Categories");
              setSearch("");
              setPriceRange("all");
              setRegion("all");
              setSortBy("newest");
              setSearchParams({});
            }}
            className="w-full py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Reset Filters
          </button>
        </aside>

        {/* Right Main Product Grid Area */}
        <div className="flex-1 space-y-6">
          {/* Top Bar with Count & Sort By */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                All Products{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({filteredProducts.length} items found)
                </span>
              </h1>
              {selectedCategory !== "All Categories" && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                    Category: {selectedCategory}
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("All Categories")}
                      className="hover:text-emerald-900 font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <label htmlFor="sortBy" className="text-gray-500 font-medium">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-4">
                🌿
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">No products found</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                We couldn't find any products matching your current filters. Try searching for something else or reset your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSearch("");
                  setPriceRange("all");
                  setRegion("all");
                  setSearchParams({});
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Shop;
