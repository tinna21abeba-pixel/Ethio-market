import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>Price: ${product.price}</p>

      <p>Category: {product.category}</p>

      <p>Seller: {product.seller}</p>

      <p>Location: {product.location}</p>

      <p>
        {product.description ||
          "This product is available from a verified Ethiopian seller."}
      </p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </main>
  );
}

export default ProductDetails;