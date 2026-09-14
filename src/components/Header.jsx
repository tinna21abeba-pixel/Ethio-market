import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { cart } = useCart();
  return (
    <header>
      <div>
        <h2>Ethio <span>Market</span></h2>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/seller">Sell</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/cart">cart {cart.length}</NavLink>
         <NavLink to="/orders">
    My Orders
  </NavLink>

      </nav>

    </header>
  )
}

export default Header