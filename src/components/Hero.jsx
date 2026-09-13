import { Link } from "react-router-dom";
function Hero() {
  return (
    <section>
      <p>Discover authentic Ethiopian products</p>

      <h1>
        Bringing Ethiopian Products
        <br />
        to the World
      </h1>

      <p>
        Discover products from Ethiopian sellers
        and connect with buyers locally and internationally.
      </p>

      <Link to="/shop">Start Shopping</Link>
      <Link to="/seller">Sell on EthioMarket</Link>


    </section>
  );
}

export default Hero;