import React from "react";
import categories from "../data/Categories";

function Categories() {
  return (
    <section>
      <h2>Browse Categories</h2>

      <div>
        {categories.map((category) => (
          <button key={category.id}>
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;