import { Routes, Route, Navigate } from "react-router-dom";

import CartProvider from "./context/CartContext";
import Layout from "./components/LayOut";

import Home from "./components/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Shiping from "./pages/Shiping";
import OrderConfirmation from "./pages/OrderConfirmation";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import SellerDashboard from "./pages/seller/SellerDashBoard";
import SellerProducts from "./pages/seller/Products";
import AddProduct from "./pages/seller/AddProducts";
import SellerOrders from "./pages/seller/sellerOrders";
import SellerProfile from "./pages/seller/SellerProfile"; 
import ProductProvider from "./context/ProductContext";
import OrderProvider from "./context/OrderContext";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkout/shipping" element={<Shiping />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Buyer / User Protected Routes */}
                <Route
                  path="orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Seller Protected Routes */}
                <Route
                  path="seller"
                  element={
                    <ProtectedRoute role="seller">
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="seller/products"
                  element={
                    <ProtectedRoute role="seller">
                      <SellerProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="seller/add-product"
                  element={
                    <ProtectedRoute role="seller">
                      <AddProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="seller/orders"
                  element={
                    <ProtectedRoute role="seller">
                      <SellerOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="seller/profile"
                  element={
                    <ProtectedRoute role="seller">
                      <SellerProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Aliases & Fallbacks */}
                <Route path="sell" element={<Navigate to="/seller" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;