import { useParams } from "react-router-dom";
import products from "../data/Product";
import { useCart } from "../context/CartContext";


function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>Price: ${product.price}</p>

      <p>Category: {product.category}</p>

      <p>Seller: {product.seller}</p>

      <p>Location: {product.location}</p>

      <p>
        This product is available from a verified
        Ethiopian seller.
      </p>

      <button onClick={()=>addToCart(product)}>Add to Cart</button>
    </main>
  );
}

export default ProductDetails;