import React from 'react'
import products from '../data/Product.'
import ProductCard from './ProductCard'

function FeaturedProducts() {
  return (
    <div>
        <h1>Featured Products</h1>
        <div className='grid'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

    </div>
  )
}

export default FeaturedProducts
