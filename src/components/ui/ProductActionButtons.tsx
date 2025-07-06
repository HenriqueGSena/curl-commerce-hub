
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductActionButtonsProps {
  product: Product;
  selectedLength: string;
  selectedWeight: string;
  quantity: number;
  isAuthenticated: boolean;
  isFavorite: (id: number) => boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleFavorite: () => void;
}

export const ProductActionButtons = ({
  product,
  isAuthenticated,
  isFavorite,
  onAddToCart,
  onBuyNow,
  onToggleFavorite
}: ProductActionButtonsProps) => {
  return (
    <div className="space-y-3 pt-4">
      <Button 
        onClick={onAddToCart}
        variant="outline"
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-base h-12"
        size="lg"
      >
        Adicionar ao carrinho
      </Button>
      
      <Button 
        onClick={onBuyNow}
        className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-3 text-base h-12"
        size="lg"
      >
        Compre já
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={onToggleFavorite}
        className="w-full border-brand-medium text-brand-primary hover:bg-brand-light h-12"
      >
        <Heart 
          className={`h-5 w-5 mr-2 ${
            isAuthenticated && isFavorite(product.id) 
              ? 'text-red-500 fill-red-500' 
              : 'text-brand-primary'
          }`} 
        />
        {isAuthenticated && isFavorite(product.id) ? 'Adicionar aos Favoritos' : 'Adicionar aos Favoritos'}
      </Button>
    </div>
  );
};
