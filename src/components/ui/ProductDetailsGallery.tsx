
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";

interface ProductDetailsGalleryProps {
  product: Product;
}

export const ProductDetailsGallery = ({ product }: ProductDetailsGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simular múltiplas imagens para galeria
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="text-gray-400 text-6xl">📸</div>
        
        {product.discount && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2">
        {productImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center text-2xl transition-all ${
              index === currentImageIndex 
                ? 'ring-2 ring-pink-500 scale-105' 
                : 'hover:scale-105'
            }`}
          >
            📸
          </button>
        ))}
      </div>
    </div>
  );
};
