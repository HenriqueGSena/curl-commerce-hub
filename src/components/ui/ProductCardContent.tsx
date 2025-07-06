
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardContentProps {
  product: Product;
}

export const ProductCardContent = ({ product }: ProductCardContentProps) => {
  return (
    <div className="p-4 flex-1 flex flex-col">
      <div className="mb-2">
        <Badge variant="secondary" className="text-xs bg-brand-light text-brand-dark">
          {product.category}
        </Badge>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-brand-primary transition-colors">
        {product.name}
      </h3>
      
      <div className="flex items-center gap-1 mb-2">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        <span className="text-sm text-gray-500">({product.reviews})</span>
      </div>

      {/* Descrição do produto */}
      <p className="text-sm text-gray-600 mb-3 flex-1">
        Cabelo de alta qualidade, ideal para transformar seu visual com elegância e naturalidade.
      </p>
      
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

      <div className="text-center">
        <span className="text-sm text-brand-primary font-medium">
          Clique para ver detalhes
        </span>
      </div>
    </div>
  );
};
