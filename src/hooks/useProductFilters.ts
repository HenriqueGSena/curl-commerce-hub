
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { allProducts, Product } from "@/data/products";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const applyFiltersAndSort = useCallback((filters: string[], order: "newest" | "oldest", categoryFilter?: string) => {
    let filtered = allProducts;
    
    // Aplicar filtro de categoria primeiro
    if (categoryFilter) {
      filtered = allProducts.filter(product => {
        const categoryMap: { [key: string]: string[] } = {
          'naturais': ['Cabelos Naturais'],
          'sinteticos': ['Cabelos Sintéticos'],
          'mega-hair': ['Mega Hair'],
          'perucas': ['Perucas']
        };
        
        return categoryMap[categoryFilter]?.includes(product.category);
      });
    }
    
    // Aplicar outros filtros
    if (filters.length > 0) {
      filtered = filtered.filter(product =>
        filters.some(filter => product.filters.includes(filter))
      );
    }
    
    // Aplicar ordenação
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredProducts(sorted);
  }, []);

  // Verificar parâmetros da URL ao carregar
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    applyFiltersAndSort(activeFilters, sortOrder, categoria || undefined);
  }, [searchParams, activeFilters, sortOrder, applyFiltersAndSort]);

  const handleFilterChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
    const categoria = searchParams.get('categoria');
    applyFiltersAndSort(filters, sortOrder, categoria || undefined);
  }, [sortOrder, applyFiltersAndSort, searchParams]);

  const handleSortChange = useCallback((newSortOrder: "newest" | "oldest") => {
    setSortOrder(newSortOrder);
    const categoria = searchParams.get('categoria');
    applyFiltersAndSort(activeFilters, newSortOrder, categoria || undefined);
  }, [activeFilters, applyFiltersAndSort, searchParams]);

  const clearCategoryFilter = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('categoria');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return {
    filteredProducts,
    activeFilters,
    sortOrder,
    handleFilterChange,
    handleSortChange,
    clearCategoryFilter,
    categoryFilter: searchParams.get('categoria')
  };
};
