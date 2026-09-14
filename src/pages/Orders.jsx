import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { orders } = useOrders();
  const { user } = useAuth();

  const buyerOrders = orders.filter(
    (order) => order.buyerEmail === user.email
  );

  return (
    <main>
      <h1>My Orders</h1>

      {buyerOrders.length === 0 ? (
        <>
          <p>You have not placed any orders yet.</p>

          <Link to="/shop">
            Start Shopping
          </Link>
        </>
      ) : (
        buyerOrders.map((order) => (
          <article key={order.id}>
            <h2>Order #{order.id}</h2>

            <p>Status: {order.status}</p>

            <p>Total: ${order.total}</p>

            <h3>Products</h3>

            {order.items.map((product) => (
              <p key={product.id}>
                {product.name} - ${product.price}
              </p>
            ))}
          </article>
        ))
      )}
    </main>
  );
}

export default Orders;