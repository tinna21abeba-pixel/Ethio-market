import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Hero />
      <FeaturedProducts />
      <Categories />
    </main>
  );
}

export default Home;