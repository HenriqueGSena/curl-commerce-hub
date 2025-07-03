
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="group hover:shadow-xl transition-all duration-300 border-pink-100 hover:border-pink-200 overflow-hidden h-full flex flex-col cursor-pointer">
        <ProductCardImage product={product} />
        <CardContent className="p-0">
          <ProductCardContent product={product} />
        </CardContent>
      </Card>
    </Link>
  );
};
