import React from 'react'
import { Link } from 'react-router-dom'
function ProductCard({product}) {
  return (
    <div>
        <h3> {product.name}</h3>
        <p>price : {product.price}</p>
        <p>category : {product.category}</p>
        <p>seller : {product.seller}</p>
        <p>location : {product.location}</p>
        <Link to={`/product/${product.id}`}
  className="viewProduct"
>
  View Product
</Link>
    </div>
  )
}

export default ProductCard