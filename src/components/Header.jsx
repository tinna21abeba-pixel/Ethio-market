import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { cartCount } = useCart();
  const { user, logOut, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    else if (logOut) logOut();
    navigate("/login");
  };

  const isSeller = user?.role === "seller";

  return (
    <header className="main-header">
      <div className="header-brand">
        <Link to="/" className="brand-logo">
          <h2>
            Ethio <span>Market</span>
          </h2>
        </Link>
      </div>

      <nav className="header-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/shop">Shop</NavLink>

        {user ? (
          <>
            {isSeller ? (
              <>
                <NavLink to="/seller" end>
                  Seller Hub
                </NavLink>
                <NavLink to="/seller/orders">Seller Orders</NavLink>
                <NavLink to="/seller/products">Inventory</NavLink>
              </>
            ) : (
              <NavLink to="/orders">My Orders</NavLink>
            )}

            <NavLink to="/cart" className="cart-nav-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>

            <NavLink to={isSeller ? "/seller/profile" : "/profile"}>
              Profile
            </NavLink>

            <div className="user-nav-section">
              <span className="user-greeting">
                Hi, <strong>{user.name?.split(" ")[0]}</strong>
              </span>
              <button
                type="button"
                className="btn-header-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/seller">Sell</NavLink>
            <NavLink to="/cart" className="cart-nav-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="btn-register-link">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;