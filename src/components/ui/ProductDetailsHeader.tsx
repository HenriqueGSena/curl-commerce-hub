
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailsHeaderProps {
  product: Product;
}

export const ProductDetailsHeader = ({ product }: ProductDetailsHeaderProps) => {
  return (
    <div>
      <Badge variant="secondary" className="bg-brand-light text-brand-dark mb-2">
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
  );
};
