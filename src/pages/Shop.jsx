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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
        return b.id - a.id;
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

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    search !== "" ||
    priceRange !== "all" ||
    region !== "all" ||
    sortBy !== "newest";

  const handleResetFilters = () => {
    setSelectedCategory("All Categories");
    setSearch("");
    setPriceRange("all");
    setRegion("all");
    setSortBy("newest");
    setSearchParams({});
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Mobile Horizontal Category Filter Strip (Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition flex-shrink-0 flex items-center gap-1.5 ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Left Sidebar Filters (Hidden on Mobile, Visible on lg+) */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-5">
          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Search Catalog
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400 text-xs">🔍</span>
            </div>
          </div>

          {/* Categories Filter with Item Counts */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Categories
            </h3>
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
                    <span className="truncate">{cat}</span>
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
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Price Range
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price_desktop"
                  checked={priceRange === "all"}
                  onChange={() => setPriceRange("all")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>All Prices</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price_desktop"
                  checked={priceRange === "under20"}
                  onChange={() => setPriceRange("under20")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Under $20</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price_desktop"
                  checked={priceRange === "20to50"}
                  onChange={() => setPriceRange("20to50")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>$20 – $50</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price_desktop"
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
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              Country / Origin
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="region_desktop"
                  checked={region === "all"}
                  onChange={() => setRegion("all")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>All Regions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="region_desktop"
                  checked={region === "ethiopia"}
                  onChange={() => setRegion("ethiopia")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Origin: Ethiopia (Direct)</span>
              </label>
            </div>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Right Main Product Area */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Top Control Bar: Total items, Mobile Filter Button, Sort Dropdown */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div>
              <h1 className="text-sm sm:text-base font-bold text-gray-900">
                All Products{" "}
                <span className="text-xs font-normal text-gray-500">
                  ({filteredProducts.length})
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                <span>⚙️ Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                )}
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Filter Drawer/Panel */}
          {mobileFiltersOpen && (
            <div className="lg:hidden bg-white p-4 rounded-xl border border-emerald-200 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  Filters & Refinements
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-xs text-gray-400 hover:text-gray-700 font-bold"
                >
                  &times; Close
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-gray-800 block mb-1">
                    Price Range
                  </span>
                  <div className="space-y-1 text-gray-600">
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="price_mobile"
                        checked={priceRange === "all"}
                        onChange={() => setPriceRange("all")}
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="price_mobile"
                        checked={priceRange === "under20"}
                        onChange={() => setPriceRange("under20")}
                      />
                      <span>Under $20</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="price_mobile"
                        checked={priceRange === "20to50"}
                        onChange={() => setPriceRange("20to50")}
                      />
                      <span>$20 – $50</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="price_mobile"
                        checked={priceRange === "over50"}
                        onChange={() => setPriceRange("over50")}
                      />
                      <span>$50+</span>
                    </label>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-800 block mb-1">
                    Origin
                  </span>
                  <div className="space-y-1 text-gray-600">
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="region_mobile"
                        checked={region === "all"}
                        onChange={() => setRegion("all")}
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name="region_mobile"
                        checked={region === "ethiopia"}
                        onChange={() => setRegion("ethiopia")}
                      />
                      <span>Ethiopia</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Product Cards Grid: 1 col on xs, 2 cols on sm/md, 3 cols on xl */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-4">
                🌿
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-1">
                No products found
              </h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                We couldn't find any products matching your selected category or filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-5">
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
