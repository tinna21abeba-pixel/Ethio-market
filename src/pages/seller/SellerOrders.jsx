import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";

function SellerOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();

  const sellerOrders = orders.filter((order) =>
    order.items.some(
      (product) => product.seller === user.name
    )
  );

  return (
    <main>
      <h1>Seller Orders</h1>

      {sellerOrders.length === 0 ? (
        <p>No orders for your products yet.</p>
      ) : (
        sellerOrders.map((order) => {
          const sellerProducts = order.items.filter(
            (product) => product.seller === user.name
          );

          return (
            <article key={order.id}>
              <h2>Order #{order.id}</h2>

              <p>
                Buyer: {order.buyer}
              </p>

              <p>
                Buyer Email: {order.buyerEmail}
              </p>

              <h3>Your Products</h3>

              {sellerProducts.map((product) => (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                </div>
              ))}

              <p>
                Order Status: {order.status}
              </p>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Processing"
                  )
                }
              >
                Mark as Processing
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Shipped"
                  )
                }
              >
                Mark as Shipped
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Delivered"
                  )
                }
              >
                Mark as Delivered
              </button>

              <button
                onClick={() =>
                  updateOrderStatus(
                    order.id,
                    "Cancelled"
                  )
                }
              >
                Cancel Order
              </button>
            </article>
          );
        })
      )}
    </main>
  );
}

export default SellerOrders;