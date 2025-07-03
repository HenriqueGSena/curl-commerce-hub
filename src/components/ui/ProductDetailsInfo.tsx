
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import { ProductDetailsShipping } from "./ProductDetailsShipping";

interface ProductDetailsInfoProps {
  product: Product;
}

export const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

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

  return (
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
      <ProductDetailsShipping />

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
  );
};
