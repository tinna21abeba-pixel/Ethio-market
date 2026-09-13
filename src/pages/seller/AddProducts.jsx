import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
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

    console.log("New product:", product);

    alert("Product added successfully!");
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