
import { useState, useCallback } from "react";
import { allProducts, Product } from "@/data/products";

export const useProductFilters = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const applyFiltersAndSort = useCallback((filters: string[], order: "newest" | "oldest") => {
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
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredProducts(sorted);
  }, []);

  const handleFilterChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
    applyFiltersAndSort(filters, sortOrder);
  }, [sortOrder, applyFiltersAndSort]);

  const handleSortChange = useCallback((newSortOrder: "newest" | "oldest") => {
    setSortOrder(newSortOrder);
    applyFiltersAndSort(activeFilters, newSortOrder);
  }, [activeFilters, applyFiltersAndSort]);

  return {
    filteredProducts,
    activeFilters,
    sortOrder,
    handleFilterChange,
    handleSortChange
  };
};
