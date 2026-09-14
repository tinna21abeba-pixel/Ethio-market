import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useOrders } from "../../context/OrderContext";

function SellerProfile() {
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
  const sellerOrders = orders.filter((order) => order.items?.some(isSellerItem));

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>
        <h1>Seller Profile</h1>
        <p className="profile-badge">Verified Ethiopian Merchant</p>

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <span className="label">Store / Merchant Name</span>
            <strong>{user?.name || "N/A"}</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Registered Email</span>
            <strong>{user?.email || "N/A"}</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Account Role</span>
            <strong className="text-capitalize">{user?.role || "seller"}</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Active Listed Products</span>
            <strong>{sellerProducts.length} Items</strong>
          </div>

          <div className="profile-detail-item">
            <span className="label">Total Orders Received</span>
            <strong>{sellerOrders.length} Orders</strong>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/seller" className="btn-primary">
            Seller Dashboard
          </Link>
          <Link to="/seller/products" className="btn-secondary">
            Manage Products
          </Link>
          <button type="button" className="btn-danger-outline" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default SellerProfile;