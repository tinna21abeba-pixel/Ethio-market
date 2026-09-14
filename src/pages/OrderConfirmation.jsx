import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Order Confirmed!</h1>

        {orderId && <p className="order-id-badge">Order ID: #{orderId}</p>}

        <p className="confirmation-msg">
          Thank you for your order! Your purchase was placed successfully and the seller has been notified.
        </p>

        <div className="confirmation-actions">
          <Link to="/orders" className="btn-primary">
            View / Track My Orders
          </Link>
          <Link to="/shop" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;