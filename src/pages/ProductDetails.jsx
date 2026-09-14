import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="empty-state">
          <h1>Product not found</h1>
          <p>The item you are looking for does not exist or has been removed.</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <div className="product-details-header">
          <Link to="/shop" className="back-link">
            &larr; Back to Shop
          </Link>
          <span className="badge category-badge">{product.category}</span>
        </div>

        <div className="product-details-card">
          {product.imageUrl && (
            <div className="details-hero-img-box">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="details-hero-img"
                onError={(e) => {
                  e.target.parentElement.style.display = "none";
                }}
              />
            </div>
          )}

          <h1>{product.name}</h1>
          <p className="product-price-large">${product.price} {product.currency || "USD"}</p>

          <div className="product-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Verified Merchant:</span>
              <strong>{product.seller || "Authentic Artisan"}</strong>
            </div>
            <div className="meta-item">
              <span className="meta-label">Origin:</span>
              <strong>📍 {product.origin || product.location || "Ethiopia"}</strong>
            </div>
            {product.stock && (
              <div className="meta-item">
                <span className="meta-label">Available Stock:</span>
                <strong>{product.stock} units</strong>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <strong>{product.category}</strong>
            </div>
          </div>

          <div className="product-description-box">
            <h3>Product Story & Details</h3>
            <p>
              {product.description ||
                "Authentic handcrafted Ethiopian specialty crafted with traditional techniques, sourced directly from verified local producers."}
            </p>
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`btn-primary btn-add-cart ${added ? "btn-success" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart!" : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
            </button>

            {added && (
              <Link to="/cart" className="view-cart-link">
                View in Cart &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;