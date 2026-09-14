import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Coffee",
    description: "",
    seller: user?.name || "",
    location: "Addis Ababa",
  });

  useEffect(() => {
    if (user?.name && !product.seller) {
      setProduct((prev) => ({ ...prev, seller: user.name }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addProduct({
      ...product,
      price: Number(product.price),
      seller: product.seller || user?.name || "Verified Seller",
      sellerId: user?.id || user?.email || `seller_${Date.now()}`,
    });

    navigate("/seller/products");
  };

  return (
    <main className="seller-add-product-page">
      <div className="seller-header-nav">
        <h1>Add New Ethiopian Product</h1>
        <Link to="/seller/products" className="btn-secondary">
          &larr; Back to My Products
        </Link>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Yirgacheffe Special Roast"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($ USD) *</label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                step="0.01"
                placeholder="25.00"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="Coffee">Coffee</option>
                <option value="Traditional Clothing">Traditional Clothing</option>
                <option value="Food">Food</option>
                <option value="Spices">Spices</option>
                <option value="Handcrafts">Handcrafts</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="seller">Seller / Brand Name *</label>
              <input
                type="text"
                id="seller"
                name="seller"
                value={product.seller}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Origin / Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Addis Ababa, Sidama, Harar"
                value={product.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe the authentic quality, heritage, and craftsmanship..."
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Publish Product
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/seller/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;