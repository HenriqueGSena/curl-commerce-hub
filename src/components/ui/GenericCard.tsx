import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BaseCard } from "@/components/ui/BaseCard";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface CardAction {
  type: 'favorite' | 'custom';
  icon?: React.ReactNode;
  onClick?: (data: any) => void;
  className?: string;
}

interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  discount?: number;
  rating?: number;
  reviews?: number;
  description?: string;
  link?: string;
  actions?: CardAction[];
}

interface GenericCardProps {
  data: CardData;
  variant?: 'default' | 'product' | 'content' | 'primary' | 'accent';
  size?: 'sm' | 'default' | 'lg' | 'none';
  showImage?: boolean;
  showActions?: boolean;
  showRating?: boolean;
  showPrice?: boolean;
  className?: string;
}

export const GenericCard = ({
  data,
  variant = 'product',
  size = 'none',
  showImage = true,
  showActions = true,
  showRating = true,
  showPrice = true,
  className = ''
}: GenericCardProps) => {
  const { isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cardImages = data.images || (data.image ? [data.image] : []);

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
      id: parseInt(data.id),
      name: data.title,
      price: data.price || 0,
      image: data.image || '',
      category: data.category || '',
      rating: data.rating || 0,
      reviews: data.reviews || 0,
      originalPrice: data.originalPrice,
      discount: data.discount,
    };

    if (isFavorite(parseInt(data.id))) {
      removeFromFavorites(parseInt(data.id));
      toast({
        title: "Removido dos favoritos",
        description: `${data.title} foi removido dos favoritos.`,
      });
    } else {
      addToFavorites(favoriteItem);
      toast({
        title: "Adicionado aos favoritos",
        description: `${data.title} foi adicionado aos favoritos.`,
      });
    }
  };

  const handleCustomAction = (action: CardAction, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    action.onClick?.(data);
  };

  const CardContent = () => (
    <BaseCard variant={variant} size={size} className={`h-full flex flex-col ${className}`}>
      {/* Imagem */}
      {showImage && cardImages.length > 0 && (
        <div className="relative">
          <div className={`${size === 'sm' ? 'aspect-[3/4]' : 'aspect-square'} bg-gradient-to-br from-brand-light/20 to-brand-medium/20 flex items-center justify-center relative overflow-hidden rounded-t-lg`}>
            <div className="text-brand-primary/40 text-4xl">📸</div>
            
            {/* Indicadores da galeria */}
            {cardImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {cardImages.map((_, index) => (
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
            )}
          </div>
          
          {/* Badge de desconto */}
          {data.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{data.discount}%
            </Badge>
          )}

          {/* Badge personalizado */}
          {data.badge && (
            <Badge 
              variant={data.badge.variant || 'default'} 
              className={`absolute top-2 left-2 ${data.badge.className || ''}`}
            >
              {data.badge.text}
            </Badge>
          )}
          
          {/* Ações */}
          {showActions && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {/* Botão de favorito padrão */}
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white transition-colors"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isAuthenticated && isFavorite(parseInt(data.id)) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-600'
                  }`} 
                />
              </Button>

              {/* Ações customizadas */}
              {data.actions?.map((action, index) => 
                action.type === 'custom' && (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`bg-white/80 hover:bg-white transition-colors ${action.className || ''}`}
                    onClick={(e) => handleCustomAction(action, e)}
                  >
                    {action.icon}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Categoria/Badge */}
        {data.category && (
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs bg-brand-light text-brand-dark">
              {data.category}
            </Badge>
          </div>
        )}
        
        {/* Título */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-brand-primary transition-colors">
          {data.title}
        </h3>

        {/* Subtítulo */}
        {data.subtitle && (
          <p className="text-sm text-gray-600 mb-2">
            {data.subtitle}
          </p>
        )}
        
        {/* Rating */}
        {showRating && data.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{data.rating}</span>
            {data.reviews && (
              <span className="text-sm text-gray-500">({data.reviews})</span>
            )}
          </div>
        )}

        {/* Descrição */}
        {data.description && (
          <p className="text-sm text-gray-600 mb-3 flex-1">
            {data.description}
          </p>
        )}
        
        {/* Preço */}
        {showPrice && data.price && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              R$ {data.price.toFixed(2)}
            </span>
            {data.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {data.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center">
          <span className="text-sm text-brand-primary font-medium">
            Clique para ver detalhes
          </span>
        </div>
      </div>
    </BaseCard>
  );

  if (data.link) {
    return (
      <Link to={data.link}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};