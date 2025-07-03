
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

interface ProductDetailsActionsProps {
  product: Product;
}

export const ProductDetailsActions = ({ product }: ProductDetailsActionsProps) => {
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
  );
};
