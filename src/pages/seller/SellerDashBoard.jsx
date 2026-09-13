import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SellerDashboard() {
  const { user, logout } = useAuth();

  return (
    <main>
      <h1>Seller Dashboard</h1>

      <p>
        Welcome, {user.name}
      </p>

      <nav>
        <Link to="/seller">
          Dashboard
        </Link>

        <Link to="/seller/products">
          Products
        </Link>

        <Link to="/seller/add-product">
          Add Product
        </Link>

        <Link to="/seller/orders">
          Orders
        </Link>

        <Link to="/seller/profile">
          Profile
        </Link>
      </nav>

      <section>
        <h2>Overview</h2>

        <p>Total Products: 0</p>

        <p>Total Orders: 0</p>

        <p>Total Sales: $0</p>
      </section>

      <button onClick={logout}>
        Logout
      </button>
    </main>
  );
}

export default SellerDashboard;