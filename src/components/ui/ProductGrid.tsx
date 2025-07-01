
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
