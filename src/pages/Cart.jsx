import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <main>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <section>
            {cart.map((product) => (
              <article key={product.id}>
                <h3>{product.name}</h3>

                <p>Price: ${product.price}</p>

                <button
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <section>
            <h2>Order Summary</h2>

            <p>Subtotal: ${subtotal}</p>

            <Link to="/checkout">
              Proceed to Checkout
            </Link>
          </section>
        </>
      )}
    </main>
  );
}

export default Cart;