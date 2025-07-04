
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Heart, CreditCard } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Filtros personalizáveis */}
      <div className="space-y-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
        <h3 className="font-semibold text-gray-900 mb-3">Personalize seu produto</h3>
        
        {/* Tamanho do cabelo */}
        <div className="space-y-2">
          <Label htmlFor="length">Tamanho do cabelo</Label>
          <Select value={selectedLength} onValueChange={setSelectedLength}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o comprimento" />
            </SelectTrigger>
            <SelectContent>
              {lengthOptions.map((length) => (
                <SelectItem key={length} value={length.toString()}>
                  {length} cm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Volume (gramas) */}
        <div className="space-y-2">
          <Label htmlFor="weight">Volume (gramas)</Label>
          <Select value={selectedWeight} onValueChange={setSelectedWeight}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o peso" />
            </SelectTrigger>
            <SelectContent>
              {weightOptions.map((weight) => (
                <SelectItem key={weight} value={weight.toString()}>
                  {weight}g
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantidade */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="space-y-3">
        <Button 
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
          size="lg"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Comprar Agora
        </Button>
        
        <Button 
          onClick={handleAddToCart}
          variant="outline"
          className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Adicionar ao Carrinho
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
