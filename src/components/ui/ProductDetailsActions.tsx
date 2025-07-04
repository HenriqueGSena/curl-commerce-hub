
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Heart, CreditCard, Plus, Minus } from "lucide-react";
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
  
  // Estados para os filtros personalizáveis
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Opções de comprimento
  const lengthOptions = [40, 45, 50, 55, 60, 65, 70, 75, 80];
  
  // Opções de peso (100g a 200g, incrementos de 10g)
  const weightOptions = Array.from({ length: 11 }, (_, i) => 100 + (i * 10));

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para adicionar produtos ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedLength || !selectedWeight) {
      toast({
        title: "Configuração incompleta",
        description: "Por favor, selecione o tamanho e o volume desejados.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: `${product.name} - ${selectedLength}cm - ${selectedWeight}g`,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para finalizar a compra.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedLength || !selectedWeight) {
      toast({
        title: "Configuração incompleta",
        description: "Por favor, selecione o tamanho e o volume desejados.",
        variant: "destructive",
      });
      return;
    }

    // Adicionar ao carrinho e redirecionar para checkout
    handleAddToCart();
    
    toast({
      title: "Redirecionando para checkout",
      description: "Finalizando sua compra...",
    });
    
    // Aqui você pode adicionar navegação para página de checkout
    // navigate('/checkout');
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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="space-y-6">
      {/* Filtros personalizáveis */}
      <div className="space-y-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
        {/* Tamanho do cabelo */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Tamanho</Label>
          <div className="flex flex-wrap gap-2">
            {lengthOptions.map((length) => (
              <button
                key={length}
                onClick={() => setSelectedLength(length.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedLength === length.toString()
                    ? 'bg-pink-400 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-pink-50'
                }`}
              >
                {length}cm
              </button>
            ))}
          </div>
        </div>

        {/* Volume (gramas) */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Volume (Gramas)</Label>
          <div className="flex flex-wrap gap-2">
            {weightOptions.map((weight) => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedWeight === weight.toString()
                    ? 'bg-pink-400 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-pink-50'
                }`}
              >
                {weight}g
              </button>
            ))}
          </div>
        </div>

        {/* Quantidade */}
        <div className="space-y-3">
          <Label className="text-gray-700 font-medium">Quantidade</Label>
          <div className="flex items-center justify-center max-w-xs">
            <div className="flex items-center border border-gray-300 rounded-full bg-white">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-gray-100 rounded-l-full transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="px-6 py-3 text-lg font-medium text-gray-900 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 hover:bg-gray-100 rounded-r-full transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-3">
        <Button 
          onClick={handleAddToCart}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-base"
          size="lg"
        >
          Adicionar ao carrinho
        </Button>
        
        <Button 
          onClick={handleBuyNow}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 text-base"
          size="lg"
        >
          Compre já
        </Button>
      </div>

      {/* Botão de favoritar */}
      <Button
        variant="outline"
        size="lg"
        onClick={handleToggleFavorite}
        className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
      >
        <Heart 
          className={`h-5 w-5 mr-2 ${
            isAuthenticated && isFavorite(product.id) 
              ? 'text-red-500 fill-red-500' 
              : 'text-pink-600'
          }`} 
        />
        {isAuthenticated && isFavorite(product.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
      </Button>
    </div>
  );
};
