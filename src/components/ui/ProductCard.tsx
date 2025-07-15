
import { GenericCard } from "@/components/ui/GenericCard";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const cardData = {
    id: product.id.toString(),
    title: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    discount: product.discount,
    rating: product.rating,
    reviews: product.reviews,
    description: "Cabelo de alta qualidade, ideal para transformar seu visual com elegância e naturalidade.",
    link: `/produto/${product.id}`
  };

  return (
    <GenericCard 
      data={cardData}
      variant="product"
      size="none"
      showImage={true}
      showActions={true}
      showRating={true}
      showPrice={true}
    />
  );
};
