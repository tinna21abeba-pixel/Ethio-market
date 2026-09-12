import Header from "./Header";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Shop from "../pages/Shop";

function Home() {
  return (
    <>
      <Header />
      
      <main>
        <Hero />
        
        <Categories />
        <FeaturedProducts />
<section>
        <Shop />
</section>
      </main>
    </>
  );
}

export default Home;