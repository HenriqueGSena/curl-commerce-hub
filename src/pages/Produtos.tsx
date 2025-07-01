import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductFilters } from "@/components/ui/ProductFilters";
import { MobileProductFilters } from "@/components/ui/MobileProductFilters";
import { ProductPagination } from "@/components/ui/ProductPagination";
import { useTranslation } from "react-i18next";

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
    filters: ["longos", "loiros", "lisos"],
    createdAt: "2024-01-15"
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
    filters: ["longos", "cacheados", "castanhos"],
    createdAt: "2024-02-10"
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
    filters: ["longos", "loiros", "ondulados"],
    createdAt: "2024-03-05"
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
    filters: ["longos", "ondulados", "castanhos"],
    createdAt: "2024-01-30"
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
    filters: ["curtos", "lisos", "loiros"],
    createdAt: "2024-03-20"
  }
];

const PRODUCTS_PER_PAGE = 6;

const Produtos = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
    
    let filtered = allProducts;
    
    if (filters.length > 0) {
      filtered = allProducts.filter(product =>
        filters.some(filter => product.filters.includes(filter))
      );
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredProducts(sorted);
  };

  const handleSortChange = (newSortOrder: "newest" | "oldest") => {
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page when sorting changes
    
    const sorted = [...filteredProducts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return newSortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredProducts(sorted);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('products.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="hidden lg:block">
              <ProductFilters 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                onSortChange={handleSortChange}
                sortOrder={sortOrder}
              />
            </div>
            <div className="lg:hidden mb-4">
              <MobileProductFilters
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                onSortChange={handleSortChange}
                sortOrder={sortOrder}
              />
            </div>
          </aside>
          
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? t('products.productsFound') : t('products.productsFoundPlural')}
                {totalPages > 1 && (
                  <span className="ml-2 text-sm">
                    ({t('products.page')} {currentPage} {t('products.of')} {totalPages})
                  </span>
                )}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {t('products.noProducts')}
                </p>
              </div>
            )}
            
            {totalPages > 1 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produtos;
