import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <main>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
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
      )}
    </main>
  );
}

export default Cart;