import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {useCart} from '../context/CartContext'

function Header() {
  const {cart}=useCart();
  return (
   <header>
    <div>
        <h2>Ethio <span>Market</span></h2>
    </div>
    <nav>
        <Link to="/">Home</Link>
        <NavLink to="/shop">Shop</NavLink>
         <NavLink to="/sell">Sell</NavLink>
          <NavLink to="/login">Login</NavLink>
           <NavLink to="/cart">cart {cart.length}</NavLink>
           </nav>
   
   </header>
  )
}

export default Header