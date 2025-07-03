
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardImageProps {
  product: Product;
}

export const ProductCardImage = ({ product }: ProductCardImageProps) => {
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
  );
};
