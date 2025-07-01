
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
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

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} ${isLiked ? "foi removido dos" : "foi adicionado aos"} favoritos.`,
    });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-pink-100 hover:border-pink-200 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
          <div className="text-gray-400 text-4xl">📸</div>
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
          onClick={handleToggleLike}
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
            {product.category}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
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
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white group-hover:shadow-lg transition-all"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
};
