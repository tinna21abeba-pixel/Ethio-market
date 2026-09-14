import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function AddProduct() {
  const { addProduct } = useProducts();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    seller: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addProduct({
      ...product,
      price: Number(product.price),
    });

    navigate("/seller/products");
  };

  return (
    <main>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Seller Name</label>

          <input
            type="text"
            name="seller"
            value={product.seller}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Add Product
        </button>

      </form>
    </main>
  );
}

export default AddProduct;