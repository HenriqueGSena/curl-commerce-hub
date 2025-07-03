
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { allProducts } from "@/data/products";
import { ProductDetailsGallery } from "./ProductDetailsGallery";
import { ProductDetailsInfo } from "./ProductDetailsInfo";
import { RelatedProducts } from "./RelatedProducts";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/produtos')}>
            Voltar aos produtos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão voltar */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Galeria de imagens */}
          <ProductDetailsGallery product={product} />

          {/* Informações do produto */}
          <ProductDetailsInfo product={product} />
        </div>

        {/* Produtos relacionados */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
};
