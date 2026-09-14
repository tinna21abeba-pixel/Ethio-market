import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Shipping() {
  const { cart, clearCart } = useCart();
const { createOrder } = useOrders();
const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  const subtotal = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  const shipping = cart.length > 0 ? 5 : 0;

  const total = subtotal + shipping;

  createOrder({
    buyer: user ? user.name : formData.fullName,
    buyerEmail: user ? user.email : formData.email,
    shippingAddress: formData,
    items: cart,
    subtotal,
    shipping,
    total,
  });

  clearCart();

  navigate("/order-confirmation");
};

  return (
    <main>
      <h1>Shipping Information</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Country</label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address</label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Place Order
        </button>
      </form>
    </main>
  );
}

export default Shipping;