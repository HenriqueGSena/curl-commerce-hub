
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Trash2, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { ProductPagination } from "@/components/ui/ProductPagination";

const FAVORITES_PER_PAGE = 6;

export const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / FAVORITES_PER_PAGE);
  const startIndex = (currentPage - 1) * FAVORITES_PER_PAGE;
  const endIndex = startIndex + FAVORITES_PER_PAGE;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  const handleAddToCart = (favorite: any) => {
    addToCart({
      id: favorite.id,
      name: favorite.name,
      price: favorite.price,
      image: favorite.image,
      quantity: 1
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${favorite.name} foi adicionado ao carrinho.`,
    });
  };

  const handleRemoveFromFavorites = (id: number, name: string) => {
    removeFromFavorites(id);
    toast({
      title: "Removido dos favoritos",
      description: `${name} foi removido dos favoritos.`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Meus Favoritos ({favorites.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum produto favoritado ainda
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {currentFavorites.map((favorite) => (
                <div key={favorite.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-gray-400 text-2xl">📸</div>
                  </div>
                  
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                      {favorite.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
                    {favorite.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">{favorite.rating}</span>
                    <span className="text-xs text-gray-500">({favorite.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      R$ {favorite.price.toFixed(2)}
                    </span>
                    {favorite.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        R$ {favorite.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAddToCart(favorite)}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Carrinho
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromFavorites(favorite.id, favorite.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
