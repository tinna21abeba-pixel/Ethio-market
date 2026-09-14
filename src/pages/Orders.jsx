import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const buyerOrders = orders.filter(
    (order) =>
      (user?.email && order.buyerEmail?.toLowerCase() === user.email.toLowerCase()) ||
      (user?.name && order.buyer?.toLowerCase() === user.name.toLowerCase()) ||
      (user?.id && order.buyerId === user.id)
  );

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "status-delivered";
      case "shipped":
        return "status-shipped";
      case "processing":
        return "status-processing";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const steps = ["Pending", "Processing", "Shipped", "Delivered"];

  const getStepIndex = (status) => {
    if (status === "Cancelled") return -1;
    const idx = steps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const d = new Date(dateString);
      return isNaN(d.getTime()) ? "Recently" : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <main className="orders-page">
      <div className="orders-header">
        <div>
          <h1>My Orders & Tracking</h1>
          <p className="subtitle">
            Track your authentic Ethiopian marketplace purchases
          </p>
        </div>
        <Link to="/shop" className="btn-secondary">
          Continue Shopping
        </Link>
      </div>

      {buyerOrders.length === 0 ? (
        <div className="empty-state">
          <p>You have not placed any orders yet.</p>
          <Link to="/shop" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {buyerOrders.map((order) => {
            const currentStep = getStepIndex(order.status);
            const isCancelled = order.status === "Cancelled";

            return (
              <article key={order.id} className="order-tracking-card">
                <div className="order-card-header">
                  <div>
                    <h2>Order #{order.id}</h2>
                    <span className="order-date">
                      Placed on: {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* Progress Stepper for non-cancelled orders */}
                {!isCancelled ? (
                  <div className="order-stepper">
                    {steps.map((step, idx) => (
                      <div
                        key={step}
                        className={`step-item ${idx <= currentStep ? "completed" : ""} ${
                          idx === currentStep ? "current" : ""
                        }`}
                      >
                        <div className="step-circle">{idx + 1}</div>
                        <span className="step-label">{step}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="order-cancelled-banner">
                    ⚠️ This order was cancelled.
                  </div>
                )}

                {/* Order Details & Items */}
                <div className="order-body">
                  <div className="order-items-section">
                    <h3>Items in Order</h3>
                    <ul className="order-items-list">
                      {order.items.map((item, index) => {
                        const qty = item.quantity || 1;
                        return (
                          <li key={index} className="order-item-detail">
                            <div>
                              <strong>{item.name}</strong>
                              <span className="item-meta">
                                Qty: {qty} &times; ${item.price}
                                {item.seller ? ` • Sold by: ${item.seller}` : ""}
                              </span>
                            </div>
                            <span className="item-price">${(item.price || 0) * qty}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {order.shippingAddress && (
                    <div className="order-shipping-summary">
                      <h3>Delivery Address</h3>
                      <p><strong>Recipient:</strong> {order.shippingAddress.fullName || order.buyer}</p>
                      <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                      <p><strong>Country:</strong> {order.shippingAddress.country}</p>
                      <p><strong>Contact:</strong> {order.shippingAddress.phone}</p>
                    </div>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-totals">
                    <span>Subtotal: ${order.subtotal || order.total - 5}</span>
                    <span>Shipping: ${order.shipping || 5}</span>
                    <strong className="order-grand-total">Total: ${order.total}</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Orders;