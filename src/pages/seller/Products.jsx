import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

function Products() {
  const { products, deleteProduct } = useProducts();

  const { user } = useAuth();

  const sellerProducts = products.filter(
    (product) => product.seller === user.name
  );

  return (
    <main>
      <h1>My Products</h1>

      <Link to="/seller/add-product">
        Add New Product
      </Link>

      {sellerProducts.length === 0 ? (
        <p>You have no products.</p>
      ) : (
        <section>
          {sellerProducts.map((product) => (
            <article key={product.id}>
              <h3>{product.name}</h3>

              <p>Price: ${product.price}</p>

              <p>
                Category: {product.category}
              </p>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
              >
                Delete
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;