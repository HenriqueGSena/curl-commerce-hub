
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductDetails } from "@/components/ui/ProductDetails";

const ProdutoDetalhes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white animate-fade-in">
      <Header />
      <main>
        <ProductDetails />
      </main>
      <Footer />
    </div>
  );
};

export default ProdutoDetalhes;
