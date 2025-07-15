
import { BaseCard } from "@/components/ui/BaseCard";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { ProductCardImage } from "./ProductCardImage";
import { ProductCardContent } from "./ProductCardContent";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/produto/${product.id}`}>
      <BaseCard variant="product" size="none" className="h-full flex flex-col">
        <ProductCardImage product={product} />
        <div className="p-0">
          <ProductCardContent product={product} />
        </div>
      </BaseCard>
    </Link>
  );
};
