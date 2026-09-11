import React from 'react'

function ProductCard({product}) {
  return (
    <div>
        <h3> {product.name}</h3>
        <p>price : {product.price}</p>
        <p>category : {product.category}</p>
        <p>seller : {product.seller}</p>
        <p>location : {product.location}</p>
        <button className='viewProduct'>view product</button>
    </div>
  )
}

export default ProductCard