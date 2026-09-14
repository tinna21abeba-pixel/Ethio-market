import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is currently empty.</p>
          <Link to="/shop" className="btn-primary">
            Explore Ethiopian Products
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <section className="cart-items">
            {cart.map((product) => {
              const itemQty = product.quantity || 1;
              const itemTotal = (product.price || 0) * itemQty;

              return (
                <article key={product.id} className="cart-item-card">
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p className="cart-item-meta">
                      <span>Category: {product.category || "General"}</span>
                      {product.seller && <span>Seller: {product.seller}</span>}
                    </p>
                    <p className="cart-item-price">Unit Price: ${product.price}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, itemQty - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-value">{itemQty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(product.id, itemQty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item-total">
                      Total: <strong>${itemTotal}</strong>
                    </p>

                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>${cart.length > 0 ? 5 : 0}</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <strong>Total</strong>
              <strong>${subtotal + (cart.length > 0 ? 5 : 0)}</strong>
            </div>

            <Link to="/checkout" className="btn-checkout">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="btn-continue-shopping">
              Continue Shopping
            </Link>
          </section>
        </div>
      )}
    </main>
  );
}

export default Cart;