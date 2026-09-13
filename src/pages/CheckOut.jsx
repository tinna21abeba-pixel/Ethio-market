import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  const shipping = cart.length > 0 ? 5 : 0;

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main>
        <h1>Checkout</h1>

        <p>Your cart is empty.</p>

        <Link to="/shop">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>

      <section>
        <h2>Order Summary</h2>

        {cart.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}

        <hr />

        <p>Subtotal: ${subtotal}</p>

        <p>Shipping: ${shipping}</p>

        <h3>Total: ${total}</h3>
      </section>

      <Link to="/checkout/shipping">
        Continue to Shipping
      </Link>
    </main>
  );
}

export default Checkout;