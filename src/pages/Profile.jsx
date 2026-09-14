import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { useProducts } from "../context/ProductContext";

function Profile() {
  const { user, logOut, logout } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();

  const handleLogout = logout || logOut;

  const isSeller = user?.role === "seller";

  const buyerOrders = orders.filter(
    (order) =>
      (user?.email && order.buyerEmail?.toLowerCase() === user.email.toLowerCase()) ||
      (user?.name && order.buyer?.toLowerCase() === user.name.toLowerCase()) ||
      (user?.id && order.buyerId === user.id)
  );

  const sellerProducts = products.filter(
    (p) =>
      (user?.id && p.sellerId === user.id) ||
      (user?.name && p.seller?.toLowerCase() === user.name?.toLowerCase()) ||
      (user?.email && p.sellerId === user.email)
  );

  if (!user) {
    return (
      <main className="profile-page">
        <div className="empty-state">
          <h2>Please log in to view your profile.</h2>
          <Link to="/login" className="btn-primary">
            Log In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h1>{user.name}</h1>
        <span className="profile-badge">
          {isSeller ? "Merchant / Seller Account" : "Marketplace Shopper"}
        </span>

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <span className="label">Full Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Email Address</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Account Role</span>
            <strong className="text-capitalize">{user.role}</strong>
          </div>

          {isSeller ? (
            <div className="profile-detail-item">
              <span className="label">Products Listed</span>
              <strong>{sellerProducts.length} Products</strong>
            </div>
          ) : (
            <div className="profile-detail-item">
              <span className="label">Orders Placed</span>
              <strong>{buyerOrders.length} Orders</strong>
            </div>
          )}
        </div>

        <div className="profile-actions">
          {isSeller ? (
            <>
              <Link to="/seller" className="btn-primary">
                Seller Dashboard
              </Link>
              <Link to="/seller/products" className="btn-secondary">
                My Products
              </Link>
            </>
          ) : (
            <>
              <Link to="/orders" className="btn-primary">
                View My Orders
              </Link>
              <Link to="/shop" className="btn-secondary">
                Browse Shop
              </Link>
            </>
          )}

          <button type="button" className="btn-danger-outline" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
