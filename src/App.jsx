import CartProvider from "./context/CartContext";
import Home from "./components/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </CartProvider>
  );
}
export default App;