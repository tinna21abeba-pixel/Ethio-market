import React from "react";
import { Link } from "react-router-dom";

const topCategories = [
  { name: "Coffee", icon: "☕", count: "4 Items", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e" },
  { name: "Handicrafts", icon: "🧺", count: "4 Items", img: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d" },
  { name: "Textiles & Fashion", icon: "👗", count: "1 Item", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26" },
  { name: "Spices & Herbs", icon: "🌶️", count: "5 Items", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d" },
  { name: "Honey & Food", icon: "🍯", count: "5 Items", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38" },
  { name: "Leather", icon: "👜", count: "1 Item", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62" },
];

function Categories() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Top Categories</h2>
          <p className="text-xs text-gray-500">Explore authentic Ethiopian products by specialty</p>
        </div>
        <Link
          to="/shop"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>View all categories</span>
          <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {topCategories.map((cat) => (
          <Link
            key={cat.name}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition text-center flex flex-col items-center gap-2.5"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-emerald-50 border-2 border-emerald-100 group-hover:border-emerald-500 transition relative flex items-center justify-center">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="text-xl absolute">{cat.icon}</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 group-hover:text-emerald-600 transition">
                {cat.name}
              </h3>
              <span className="text-[11px] text-gray-400">{cat.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;