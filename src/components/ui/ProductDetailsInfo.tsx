
import { Product } from "@/data/products";
import { ProductDetailsHeader } from "./ProductDetailsHeader";
import { ProductDetailsDescription } from "./ProductDetailsDescription";
import { ProductDetailsShipping } from "./ProductDetailsShipping";
import { ProductDetailsActions } from "./ProductDetailsActions";

interface ProductDetailsInfoProps {
  product: Product;
}

export const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  return (
    <div className="space-y-6">
      <ProductDetailsHeader product={product} />
      <ProductDetailsDescription />
      <ProductDetailsShipping />
      <ProductDetailsActions product={product} />
    </div>
  );
};
