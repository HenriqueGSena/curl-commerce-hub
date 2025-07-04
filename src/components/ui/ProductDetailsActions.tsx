import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { ProductVolumeSelector } from "./ProductVolumeSelector";
import { ProductQuantitySelector } from "./ProductQuantitySelector";
import { ProductActionButtons } from "./ProductActionButtons";

interface ProductDetailsActionsProps {
  product: Product;
}

export const ProductDetailsActions = ({ product }: ProductDetailsActionsProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

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

    handleAddToCart();
    
    toast({
      title: "Redirecionando para checkout",
      description: "Finalizando sua compra...",
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
      <ProductSizeSelector 
        selectedLength={selectedLength}
        onLengthChange={setSelectedLength}
      />

      <ProductVolumeSelector 
        selectedWeight={selectedWeight}
        onWeightChange={setSelectedWeight}
      />

      <ProductQuantitySelector 
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <ProductActionButtons 
        product={product}
        selectedLength={selectedLength}
        selectedWeight={selectedWeight}
        quantity={quantity}
        isAuthenticated={isAuthenticated}
        isFavorite={isFavorite}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
