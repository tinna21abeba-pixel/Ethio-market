import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartProvider from "./context/CartContext";
import Layout from "./components/Layout";

import Home from "./components/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Shiping from "./pages/Shiping";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    
      <CartProvider>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />

            <Route path="shop" element={<Shop />} />

            <Route
              path="product/:id"
              element={<ProductDetails />}
            />

            <Route path="cart" element={<Cart />} />

            <Route
              path="checkout"
              element={<Checkout />}
            />

            <Route
              path="checkout/shipping"
              element={<Shiping />}
            />

            <Route
              path="order-confirmation"
              element={<OrderConfirmation />}
            />

          </Route>

        </Routes>
      </CartProvider>
   
  );
}

export default App;