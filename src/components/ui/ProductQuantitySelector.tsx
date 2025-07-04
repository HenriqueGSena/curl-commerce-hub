
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const ProductQuantitySelector = ({ quantity, onQuantityChange }: ProductQuantitySelectorProps) => {
  const incrementQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    onQuantityChange(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-gray-900">Quantidade</Label>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
          <button
            onClick={decrementQuantity}
            className="px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="px-6 py-2 text-base font-medium text-gray-900 min-w-[60px] text-center border-l border-r border-gray-300">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
