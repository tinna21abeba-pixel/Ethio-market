import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrderContext";

function SellerDashboard() {
  const { user, logOut, logout } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();

  const handleLogout = logout || logOut;

  const isSellerItem = (item) => {
    if (!user) return false;
    return (
      (user.id && item.sellerId === user.id) ||
      (user.name && item.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user.email && item.sellerId === user.email)
    );
  };

  const sellerProducts = products.filter(isSellerItem);
  const sellerOrders = orders.filter((order) =>
    order.items?.some(isSellerItem)
  );

  const totalProducts = sellerProducts.length;
  const totalOrders = sellerOrders.length;

  const totalSales = sellerOrders.reduce((sum, order) => {
    if (order.status === "Cancelled") return sum;
    const sellerItems = order.items.filter(isSellerItem);
    const orderSum = sellerItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    return sum + orderSum;
  }, 0);

  const pendingOrders = sellerOrders.filter(
    (order) => !order.status || order.status === "Pending" || order.status === "Processing"
  ).length;

  return (
    <main className="seller-dashboard-page">
      <div className="seller-welcome-header">
        <div>
          <h1>Seller Dashboard</h1>
          <p className="subtitle">
            Welcome back, <strong>{user?.name || "Seller"}</strong> 👋
          </p>
        </div>
        <div className="seller-header-actions">
          <Link to="/seller/add-product" className="btn-primary">
            + Add Product
          </Link>
          <button type="button" className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <nav className="seller-subnav">
        <Link to="/seller" className="active">
          Overview
        </Link>
        <Link to="/seller/products">Products ({totalProducts})</Link>
        <Link to="/seller/add-product">Add Product</Link>
        <Link to="/seller/orders">Orders ({totalOrders})</Link>
        <Link to="/seller/profile">Profile</Link>
      </nav>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-info">
            <span className="stat-label">Total Products</span>
            <strong className="stat-value">{totalProducts}</strong>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🛒</span>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <strong className="stat-value">{totalOrders}</strong>
          </div>
        </div>

        <div className="stat-card highlight">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <strong className="stat-value">${totalSales.toFixed(2)}</strong>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⏳</span>
          <div className="stat-info">
            <span className="stat-label">Pending Orders</span>
            <strong className="stat-value">{pendingOrders}</strong>
          </div>
        </div>
      </section>

      {/* Recent Activity Grid */}
      <section className="dashboard-content-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <Link to="/seller/orders" className="link-more">
              View All &rarr;
            </Link>
          </div>

          {sellerOrders.length === 0 ? (
            <p className="empty-text">No orders yet for your products.</p>
          ) : (
            <ul className="recent-orders-list">
              {sellerOrders.slice(0, 4).map((order) => (
                <li key={order.id} className="recent-order-item">
                  <div>
                    <strong>Order #{order.id}</strong>
                    <span className="buyer-meta">by {order.buyer || "Guest"}</span>
                  </div>
                  <div className="recent-order-right">
                    <span className="recent-order-status">{order.status || "Pending"}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-list">
            <Link to="/seller/add-product" className="quick-action-link">
              <span>➕ List a New Product</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link to="/seller/products" className="quick-action-link">
              <span>📋 View & Edit My Inventory</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link to="/seller/orders" className="quick-action-link">
              <span>🚚 Manage Customer Shipments</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link to="/shop" className="quick-action-link">
              <span>🛍️ Browse Marketplace Storefront</span>
              <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SellerDashboard;