
import { allProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

export const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  // Produtos relacionados (mesma categoria, excluindo o atual)
  const relatedProducts = allProducts
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
};
