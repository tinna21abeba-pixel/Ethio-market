import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Shipping() {
  const { cart, clearCart, subtotal } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    country: "Ethiopia",
    city: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    const shipping = cart.length > 0 ? 5 : 0;
    const total = subtotal + shipping;

    const newOrder = createOrder({
      buyer: user ? user.name : formData.fullName,
      buyerEmail: user ? user.email : formData.email,
      buyerId: user?.id || user?.email || `buyer_${Date.now()}`,
      shippingAddress: formData,
      items: cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })),
      subtotal,
      shipping,
      total,
    });

    clearCart();
    navigate("/order-confirmation", { state: { orderId: newOrder?.id } });
  };

  if (cart.length === 0) {
    return (
      <main className="shipping-page">
        <h1>Shipping Information</h1>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <main className="shipping-page">
      <h1>Shipping Information</h1>

      <div className="shipping-layout">
        <form className="shipping-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="e.g. Addis Ababa"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="address">Street / Delivery Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="e.g. Bole Subcity, House #123"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +251 91 234 5678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-submit-order">
            Place Order (${total})
          </button>
        </form>

        <aside className="shipping-order-preview">
          <h3>Order Review</h3>
          <p className="preview-items-count">
            {cart.reduce((s, i) => s + (i.quantity || 1), 0)} Items
          </p>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name} &times; {item.quantity || 1}</span>
                <span>${(item.price || 0) * (item.quantity || 1)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${shipping}</span>
          </div>
          <div className="summary-row total-row">
            <strong>Total:</strong>
            <strong>${total}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Shipping;