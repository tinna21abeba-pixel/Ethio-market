import React from 'react'
import { useProducts } from "../context/ProductContext";
import ProductCard from './ProductCard'

function FeaturedProducts() {
  const { products } = useProducts();

  return (
    <section>
      <h2>Featured Ethiopian Products</h2>

      <div>
        {products.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts
