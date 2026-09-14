import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";

function SellerOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();

  const isSellerItem = (item) => {
    if (!user) return false;
    return (
      (user.id && item.sellerId === user.id) ||
      (user.name && item.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && item.sellerId === user.email)
    );
  };

  const sellerOrders = orders.filter((order) =>
    order.items?.some(isSellerItem)
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

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const d = new Date(dateString);
      return isNaN(d.getTime()) ? "Recent" : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <main className="seller-orders-page">
      <div className="seller-header-nav">
        <div>
          <h1>Customer Orders</h1>
          <p className="subtitle">
            Manage fulfillment and update delivery status ({sellerOrders.length} orders)
          </p>
        </div>
        <Link to="/seller" className="btn-secondary">
          &larr; Back to Dashboard
        </Link>
      </div>

      {sellerOrders.length === 0 ? (
        <div className="empty-state">
          <p>No orders received for your products yet.</p>
        </div>
      ) : (
        <div className="seller-orders-list">
          {sellerOrders.map((order) => {
            const sellerProducts = order.items.filter(isSellerItem);
            const sellerOrderTotal = sellerProducts.reduce(
              (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
              0
            );

            return (
              <article key={order.id} className="seller-order-card">
                <div className="order-card-header">
                  <div>
                    <h2>Order #{order.id}</h2>
                    <span className="order-date">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="order-buyer-info">
                  <p>
                    <strong>Buyer:</strong> {order.buyer || "Guest"}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.buyerEmail}
                  </p>
                  {order.shippingAddress && (
                    <p>
                      <strong>Deliver To:</strong>{" "}
                      {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                      {order.shippingAddress.country} (Tel:{" "}
                      {order.shippingAddress.phone})
                    </p>
                  )}
                </div>

                <div className="seller-ordered-items">
                  <h4>Your Products in this Order</h4>
                  <ul>
                    {sellerProducts.map((product, idx) => {
                      const qty = product.quantity || 1;
                      return (
                        <li key={idx} className="seller-order-item-row">
                          <span>
                            {product.name} &times; {qty}
                          </span>
                          <span>${(product.price || 0) * qty}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="seller-order-subtotal">
                    <span>Your Revenue from this Order:</span>
                    <strong>${sellerOrderTotal}</strong>
                  </div>
                </div>

                <div className="order-status-actions">
                  <span className="actions-label">Update Status:</span>
                  <div className="status-buttons">
                    <button
                      type="button"
                      className={`btn-status ${order.status === "Pending" ? "active" : ""}`}
                      onClick={() => updateOrderStatus(order.id, "Pending")}
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      className={`btn-status ${order.status === "Processing" ? "active" : ""}`}
                      onClick={() => updateOrderStatus(order.id, "Processing")}
                    >
                      Processing
                    </button>
                    <button
                      type="button"
                      className={`btn-status ${order.status === "Shipped" ? "active" : ""}`}
                      onClick={() => updateOrderStatus(order.id, "Shipped")}
                    >
                      Shipped
                    </button>
                    <button
                      type="button"
                      className={`btn-status ${order.status === "Delivered" ? "active" : ""}`}
                      onClick={() => updateOrderStatus(order.id, "Delivered")}
                    >
                      Delivered
                    </button>
                    <button
                      type="button"
                      className={`btn-status btn-status-cancel ${order.status === "Cancelled" ? "active" : ""}`}
                      onClick={() => updateOrderStatus(order.id, "Cancelled")}
                    >
                      Cancel
                    </button>
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

export default SellerOrders;