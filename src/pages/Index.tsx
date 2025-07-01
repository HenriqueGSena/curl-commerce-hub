
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white animate-fade-in">
      <Header />
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in">
        <Categories />
      </div>
      <div className="animate-fade-in">
        <FeaturedProducts />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
