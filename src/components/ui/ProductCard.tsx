
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, LogIn } from "lucide-react";
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
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simular múltiplas imagens para galeria
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Link to={`/produto/${product.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-pink-100 hover:border-pink-200 overflow-hidden h-full flex flex-col cursor-pointer">
        <div className="relative">
          {/* Galeria de imagens */}
          <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative">
            <div className="text-gray-400 text-4xl">📸</div>
            
            {/* Indicadores da galeria */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
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

          <div className="text-center">
            <span className="text-sm text-pink-600 font-medium">
              Clique para ver detalhes
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
