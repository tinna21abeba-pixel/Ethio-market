import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <main>
      <h1>Order Confirmed!</h1>

      <p>
        Thank you for your order.
      </p>

      <p>
        Your order has been successfully placed.
      </p>

      <Link to="/shop">
        Continue Shopping
      </Link>
      <Link to="/">
        Back to Home
      </Link>
    </main>
  );
}

export default OrderConfirmation;