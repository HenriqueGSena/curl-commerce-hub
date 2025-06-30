
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductFilters } from "@/components/ui/ProductFilters";

const allProducts = [
  {
    id: 1,
    name: "Cabelo Natural Liso Loiro 60cm",
    price: 299.90,
    originalPrice: 399.90,
    image: "/placeholder.svg",
    category: "Cabelos Naturais",
    rating: 4.9,
    reviews: 125,
    discount: 25,
    filters: ["longos", "loiros", "lisos"]
  },
  {
    id: 2,
    name: "Mega Hair Cacheado Castanho 50cm",
    price: 199.90,
    originalPrice: 249.90,
    image: "/placeholder.svg",
    category: "Mega Hair",
    rating: 4.8,
    reviews: 89,
    discount: 20,
    filters: ["longos", "cacheados", "castanhos"]
  },
  {
    id: 3,
    name: "Peruca Sintética Ondulada Loira 40cm",
    price: 149.90,
    originalPrice: 199.90,
    image: "/placeholder.svg",
    category: "Perucas",
    rating: 4.7,
    reviews: 67,
    discount: 25,
    filters: ["longos", "loiros", "ondulados"]
  },
  {
    id: 4,
    name: "Cabelo Sintético Crespo Preto 30cm",
    price: 89.90,
    originalPrice: 119.90,
    image: "/placeholder.svg",
    category: "Cabelos Sintéticos",
    rating: 4.6,
    reviews: 156,
    discount: 25,
    filters: ["curtos", "crespos", "pretos"]
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
    filters: ["longos", "cacheados", "ruivos"]
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
    filters: ["curtos", "lisos", "pretos"]
  },
  {
    id: 7,
    name: "Peruca Natural Ondulada Castanha 45cm",
    price: 279.90,
    originalPrice: 349.90,
    image: "/placeholder.svg",
    category: "Perucas",
    rating: 4.9,
    reviews: 78,
    discount: 20,
    filters: ["longos", "ondulados", "castanhos"]
  },
  {
    id: 8,
    name: "Cabelo Sintético Liso Loiro 35cm",
    price: 99.90,
    originalPrice: 129.90,
    image: "/placeholder.svg",
    category: "Cabelos Sintéticos",
    rating: 4.4,
    reviews: 198,
    discount: 23,
    filters: ["curtos", "lisos", "loiros"]
  }
];

const Produtos = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    
    if (filters.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        filters.some(filter => product.filters.includes(filter))
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-xl text-gray-600">
            Encontre o cabelo perfeito para você
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters 
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </aside>
          
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produtos;
