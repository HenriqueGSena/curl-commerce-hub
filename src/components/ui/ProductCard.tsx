
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, ShoppingCart, Heart, LogIn, Calculator, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simular múltiplas imagens para galeria
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

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
    <Card className="group hover:shadow-xl transition-all duration-300 border-pink-100 hover:border-pink-200 overflow-hidden h-full flex flex-col">
      <div className="relative">
        {/* Galeria de imagens */}
        <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative">
          <div className="text-gray-400 text-4xl">📸</div>
          
          {/* Indicadores da galeria */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
          onClick={handleToggleFavorite}
        >
          <Heart 
            className={`h-4 w-4 ${
              isAuthenticated && isFavorite(product.id) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600'
            }`} 
          />
        </Button>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
            {product.category}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-pink-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Descrição do produto */}
        <p className="text-sm text-gray-600 mb-3 flex-1">
          Cabelo de alta qualidade, ideal para transformar seu visual com elegância e naturalidade.
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            R$ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Calculadora de CEP */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Calcular frete</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
              maxLength={8}
              className="text-sm"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={calcularFrete}
              className="flex-shrink-0"
            >
              <Calculator className="h-4 w-4" />
            </Button>
          </div>
          {frete && (
            <p className="text-sm text-green-600 mt-2">
              Frete: R$ {frete.toFixed(2)}
            </p>
          )}
        </div>
        
        {isAuthenticated ? (
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white group-hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar Agora
          </Button>
        ) : (
          <Link to="/perfil">
            <Button 
              variant="outline"
              className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Faça login para comprar
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
