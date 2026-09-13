
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Shop from "../pages/Shop";
import {Outlet} from "react-router-dom";


function Home() {
  return (
    
    
      
      <main>
        <Outlet />
        <Hero />

        <Categories />
        <FeaturedProducts />
        <section>
          <Shop />
        </section>
      </main>
  
  );
}

export default Home;