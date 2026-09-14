import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, subtotal } = useCart();

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout Review</h1>

      <div className="checkout-container">
        <section className="checkout-summary-card">
          <h2>Order Summary ({cart.reduce((s, i) => s + (i.quantity || 1), 0)} items)</h2>

          <div className="checkout-items-list">
            {cart.map((product) => {
              const qty = product.quantity || 1;
              const itemTotal = (product.price || 0) * qty;

              return (
                <div key={product.id} className="checkout-item-row">
                  <div>
                    <strong>{product.name}</strong>
                    <span className="checkout-item-sub">
                      Qty: {qty} &times; ${product.price}
                    </span>
                  </div>
                  <span>${itemTotal}</span>
                </div>
              );
            })}
          </div>

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>

          <div className="summary-row total-row">
            <h3>Total: ${total}</h3>
          </div>

          <div className="checkout-actions">
            <Link to="/checkout/shipping" className="btn-primary">
              Continue to Shipping
            </Link>
            <Link to="/cart" className="btn-secondary">
              Back to Cart
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Checkout;