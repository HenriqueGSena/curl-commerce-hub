
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

const filterCategories = [
  {
    title: "Comprimento",
    filters: [
      { id: "longos", label: "Longos (40cm+)" },
      { id: "curtos", label: "Curtos (até 40cm)" }
    ]
  },
  {
    title: "Cor",
    filters: [
      { id: "loiros", label: "Loiros" },
      { id: "castanhos", label: "Castanhos" },
      { id: "pretos", label: "Pretos" },
      { id: "ruivos", label: "Ruivos" }
    ]
  },
  {
    title: "Textura",
    filters: [
      { id: "lisos", label: "Lisos" },
      { id: "ondulados", label: "Ondulados" },
      { id: "cacheados", label: "Cacheados" },
      { id: "crespos", label: "Crespos" }
    ]
  }
];

export const ProductFilters = ({ onFilterChange, activeFilters }: ProductFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(activeFilters);

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-pink-600 hover:text-pink-700"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {filterCategories.map((category) => (
          <div key={category.title}>
            <h3 className="font-semibold text-gray-900 mb-3">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.filters.map((filter) => (
                <div key={filter.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.id}
                    checked={selectedFilters.includes(filter.id)}
                    onCheckedChange={() => handleFilterToggle(filter.id)}
                    className="data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                  />
                  <label
                    htmlFor={filter.id}
                    className="text-sm text-gray-700 cursor-pointer hover:text-pink-600 transition-colors"
                  >
                    {filter.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {selectedFilters.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-gray-900 mb-2">
              Filtros Ativos:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filterId) => {
                const filter = filterCategories
                  .flatMap(cat => cat.filters)
                  .find(f => f.id === filterId);
                
                return filter ? (
                  <span
                    key={filterId}
                    className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                  >
                    {filter.label}
                    <button
                      onClick={() => handleFilterToggle(filterId)}
                      className="ml-1 hover:text-pink-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
