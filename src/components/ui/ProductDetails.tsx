
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, ShoppingCart, Heart, ArrowLeft, Calculator, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { allProducts, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);

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

  // Simular múltiplas imagens para galeria
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Produtos relacionados (mesma categoria, excluindo o atual)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para adicionar produtos ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para favoritar produtos.",
        variant: "destructive",
      });
      return;
    }

    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      originalPrice: product.originalPrice,
      discount: product.discount,
    };

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Removido dos favoritos",
        description: `${product.name} foi removido dos favoritos.`,
      });
    } else {
      addToFavorites(favoriteItem);
      toast({
        title: "Adicionado aos favoritos",
        description: `${product.name} foi adicionado aos favoritos.`,
      });
    }
  };

  const calcularFrete = () => {
    if (cep.length === 8) {
      // Simulação de cálculo de frete
      const freteCalculado = Math.floor(Math.random() * 20) + 5;
      setFrete(freteCalculado);
      toast({
        title: "Frete calculado",
        description: `Frete para ${cep}: R$ ${freteCalculado.toFixed(2)}`,
      });
    } else {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido com 8 dígitos.",
        variant: "destructive",
      });
    }
  };

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
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-gray-400 text-6xl">📸</div>
              
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  -{product.discount}%
                </Badge>
              )}
            </div>
            
            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center text-2xl transition-all ${
                    index === currentImageIndex 
                      ? 'ring-2 ring-pink-500 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  📸
                </button>
              ))}
            </div>
          </div>

          {/* Informações do produto */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="bg-pink-100 text-pink-700 mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-700">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} avaliações)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
                Cabelo de alta qualidade, ideal para transformar seu visual com elegância e naturalidade. 
                Este produto oferece textura macia, brilho natural e durabilidade excepcional. 
                Perfeito para quem busca um visual sofisticado e versátil, adequado para diversas ocasiões 
                e estilos. Fácil de pentear e manter, proporcionando um resultado profissional.
              </p>
            </div>

            {/* Calculadora de frete */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Calcular frete</span>
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  maxLength={8}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={calcularFrete}
                  className="flex-shrink-0"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular
                </Button>
              </div>
              {frete && (
                <p className="text-green-600 mt-3 font-medium">
                  Frete: R$ {frete.toFixed(2)}
                </p>
              )}
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4">
              {isAuthenticated ? (
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Comprar Agora
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    toast({
                      title: "Login necessário",
                      description: "Acesse sua conta para concluir a compra.",
                      variant: "destructive",
                    });
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Comprar Agora
                </Button>
              )}
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleFavorite}
                className="border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isAuthenticated && isFavorite(product.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-pink-600'
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
