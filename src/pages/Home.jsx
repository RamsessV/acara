import { useRef } from "react";
import Hero from "../components/Home/Hero";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Categories from "../components/Home/Categories";
import NewProducts from "../components/Home/NewProducts";

export default function Home() {
  const newProductsRef = useRef(null);

  const scrollToNewProducts = () => {
    if (newProductsRef.current) {
      newProductsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero onButtonClick={scrollToNewProducts} />
      <FeaturedProducts />
      <Categories />
      <div ref={newProductsRef}>
        <NewProducts />
      </div>
    </>
  );
}
