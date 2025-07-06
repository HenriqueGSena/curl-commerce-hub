
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductFilters } from "@/components/ui/ProductFilters";
import { MobileProductFilters } from "@/components/ui/MobileProductFilters";
import { ProductPagination } from "@/components/ui/ProductPagination";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { ProductsHeader } from "@/components/ui/ProductsHeader";
import { ProductsResultsInfo } from "@/components/ui/ProductsResultsInfo";
import { NoProductsFound } from "@/components/ui/NoProductsFound";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";
import { PRODUCTS_PER_PAGE } from "@/data/products";

const Produtos = () => {
  const {
    filteredProducts,
    activeFilters,
    sortOrder,
    handleFilterChange,
    handleSortChange,
    clearCategoryFilter,
    categoryFilter
  } = useProductFilters();
  
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  const handleFilterChangeWithReset = (filters: string[]) => {
    setCurrentPage(1);
    handleFilterChange(filters);
  };

  const handleSortChangeWithReset = (newSortOrder: "newest" | "oldest") => {
    setCurrentPage(1);
    handleSortChange(newSortOrder);
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'naturais': 'Cabelos Naturais',
      'sinteticos': 'Cabelos Sintéticos',
      'mega-hair': 'Mega Hair',
      'perucas': 'Perucas'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsHeader 
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* Filtro de categoria ativo */}
        {categoryFilter && (
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtrando por:</span>
              <Badge variant="secondary" className="bg-brand-light text-brand-dark flex items-center gap-2">
                {getCategoryDisplayName(categoryFilter)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-brand-secondary"
                  onClick={clearCategoryFilter}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="hidden lg:block">
              <ProductFilters 
                onFilterChange={handleFilterChangeWithReset}
                activeFilters={activeFilters}
                onSortChange={handleSortChangeWithReset}
                sortOrder={sortOrder}
              />
            </div>
            <div className="lg:hidden mb-4">
              <MobileProductFilters
                onFilterChange={handleFilterChangeWithReset}
                activeFilters={activeFilters}
                onSortChange={handleSortChangeWithReset}
                sortOrder={sortOrder}
              />
            </div>
          </aside>
          
          <div className="flex-1">
            <ProductsResultsInfo 
              totalProducts={filteredProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />
            
            {currentProducts.length > 0 ? (
              <ProductGrid products={currentProducts} />
            ) : (
              <NoProductsFound />
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
