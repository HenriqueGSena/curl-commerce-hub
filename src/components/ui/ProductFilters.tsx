
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProductFiltersProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
  onSortChange: (sortOrder: "newest" | "oldest") => void;
  sortOrder: "newest" | "oldest";
}

const filterCategories = [
  {
    title: "length",
    filters: [
      { id: "longos", label: "long" },
      { id: "curtos", label: "short" }
    ]
  },
  {
    title: "color",
    filters: [
      { id: "loiros", label: "blonde" },
      { id: "castanhos", label: "brown" },
      { id: "pretos", label: "black" },
      { id: "ruivos", label: "red" }
    ]
  },
  {
    title: "texture",
    filters: [
      { id: "lisos", label: "straight" },
      { id: "ondulados", label: "wavy" },
      { id: "cacheados", label: "curly" },
      { id: "crespos", label: "kinky" }
    ]
  }
];

export const ProductFilters = ({ onFilterChange, activeFilters, onSortChange, sortOrder }: ProductFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(activeFilters);
  const { t } = useTranslation();

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
    <Card className="sticky top-4 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('products.filters')}</CardTitle>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-pink-600 hover:text-pink-700"
            >
              <X className="h-4 w-4 mr-1" />
              {t('products.clear')}
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            {t('products.sortBy')}
          </h3>
          <Select value={sortOrder} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('products.newest')}</SelectItem>
              <SelectItem value="oldest">{t('products.oldest')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filterCategories.map((category) => (
          <div key={category.title}>
            <h3 className="font-semibold text-gray-900 mb-3">
              {t(`products.${category.title}`)}
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
                    {t(`products.${filter.label}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {selectedFilters.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-medium text-gray-900 mb-2">
              {t('products.activeFilters')}
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
                    {t(`products.${filter.label}`)}
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
