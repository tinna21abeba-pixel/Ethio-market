import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

function Products() {
  const { products, deleteProduct } = useProducts();
  const { user } = useAuth();

  const isSellerProduct = (product) => {
    if (!user) return false;
    return (
      (user.id && product.sellerId === user.id) ||
      (user.name && product.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && product.sellerId === user.email)
    );
  };

  const sellerProducts = products.filter(isSellerProduct);

  return (
    <main className="seller-products-page">
      <div className="seller-header-nav">
        <div>
          <h1>My Inventory</h1>
          <p className="subtitle">
            Manage your listed items ({sellerProducts.length} items)
          </p>
        </div>
        <div className="seller-actions-group">
          <Link to="/seller/add-product" className="btn-primary">
            + Add New Product
          </Link>
          <Link to="/seller" className="btn-secondary">
            Dashboard
          </Link>
        </div>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="empty-state">
          <p>You have not listed any products yet.</p>
          <Link to="/seller/add-product" className="btn-primary">
            List Your First Product
          </Link>
        </div>
      ) : (
        <div className="seller-products-grid">
          {sellerProducts.map((product) => (
            <article key={product.id} className="seller-product-card">
              <div className="seller-product-details">
                <span className="badge category-badge">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="price-tag">${product.price}</p>
                <p className="location-info">📍 {product.location || "Ethiopia"}</p>
                {product.description && (
                  <p className="desc-preview">{product.description}</p>
                )}
              </div>

              <div className="seller-product-footer">
                <Link to={`/product/${product.id}`} className="btn-view-preview">
                  View in Shop
                </Link>
                <button
                  type="button"
                  className="btn-danger-outline"
                  onClick={() => {
                    if (window.confirm(`Delete "${product.name}"?`)) {
                      deleteProduct(product.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;