
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const featuredProducts = [
  {
    id: 1,
    name: "Cabelo Natural Liso 60cm",
    price: 299.90,
    originalPrice: 399.90,
    image: "/placeholder.svg",
    category: "Cabelos Naturais",
    rating: 4.9,
    reviews: 125,
    discount: 25,
    filters: ["longos", "loiros", "lisos"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Mega Hair Cacheado 50cm",
    price: 199.90,
    originalPrice: 249.90,
    image: "/placeholder.svg",
    category: "Mega Hair",
    rating: 4.8,
    reviews: 89,
    discount: 20,
    filters: ["longos", "cacheados", "castanhos"],
    createdAt: "2024-02-10"
  },
  {
    id: 3,
    name: "Peruca Sintética Ondulada",
    price: 149.90,
    originalPrice: 199.90,
    image: "/placeholder.svg",
    category: "Perucas",
    rating: 4.7,
    reviews: 67,
    discount: 25,
    filters: ["longos", "loiros", "ondulados"],
    createdAt: "2024-03-05"
  },
  {
    id: 4,
    name: "Cabelo Sintético Crespo 40cm",
    price: 89.90,
    originalPrice: 119.90,
    image: "/placeholder.svg",
    category: "Cabelos Sintéticos",
    rating: 4.6,
    reviews: 156,
    discount: 25,
    filters: ["curtos", "crespos", "pretos"],
    createdAt: "2024-01-20"
  },
  {
    id: 5,
    name: "Cabelo Natural Cacheado Ruivo 55cm",
    price: 349.90,
    originalPrice: 429.90,
    image: "/placeholder.svg",
    category: "Cabelos Naturais",
    rating: 4.8,
    reviews: 92,
    discount: 19,
    filters: ["longos", "cacheados", "ruivos"],
    createdAt: "2024-02-28"
  },
  {
    id: 6,
    name: "Mega Hair Liso Preto 25cm",
    price: 129.90,
    originalPrice: 169.90,
    image: "/placeholder.svg",
    category: "Mega Hair",
    rating: 4.5,
    reviews: 143,
    discount: 24,
    filters: ["curtos", "lisos", "pretos"],
    createdAt: "2024-03-15"
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira os produtos mais vendidos e com melhor avaliação de nossa loja
          </p>
        </div>

        <div className="animate-fade-in">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-2">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Link to="/produtos">
            <Button size="lg" className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 text-lg group">
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
