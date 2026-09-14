import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {product.imageUrl && (
        <div className="product-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="product-card-top">
        <span className="product-category-tag">{product.category}</span>
        <span className="product-location-tag">📍 {product.origin || product.location || "Ethiopia"}</span>
      </div>

      <h3 className="product-title">{product.name}</h3>

      {product.description && (
        <p className="product-desc-snippet">{product.description}</p>
      )}

      <div className="product-card-meta">
        <p className="product-seller-text">By {product.seller || "Verified Seller"}</p>
        <p className="product-price-tag">${product.price}</p>
      </div>

      <div className="product-card-actions">
        <Link to={`/product/${product.id}`} className="viewProduct">
          Details
        </Link>
        <button
          type="button"
          className="btn-add-quick"
          onClick={() => addToCart(product, 1)}
          title="Add 1 to cart"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default ProductCard;