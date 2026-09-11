import React,{useState} from 'react'
import products from '../data/Product.';
import ProductCard from '../components/ProductCard';




function Shop() {
  const [search, setSearch]=useState('');
  
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);
 return (
   <main>
    <h1>Shop Ethiopian Products</h1>
    <input type='text' placeholder='Search products ...' value={search} onChange={(e)=>setSearch(e.target.value)}
    className='search-input'
    />
    <div className='product-list'>
      {filteredProducts.map((product)=>(<ProductCard key={product.id} product={product}/>))}
    </div>
   </main>
  )
}

export default Shop
