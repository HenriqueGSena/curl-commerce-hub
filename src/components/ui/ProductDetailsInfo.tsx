
import { Product } from "@/data/products";
import { ProductDetailsHeader } from "./ProductDetailsHeader";
import { ProductDetailsActions } from "./ProductDetailsActions";

interface ProductDetailsInfoProps {
  product: Product;
}

export const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  return (
    <div className="space-y-6">
      <ProductDetailsHeader product={product} />
      <ProductDetailsActions product={product} />
    </div>
  );
};
