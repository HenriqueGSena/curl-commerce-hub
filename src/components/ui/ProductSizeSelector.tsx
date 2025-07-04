
import { Label } from "@/components/ui/label";

interface ProductSizeSelectorProps {
  selectedLength: string;
  onLengthChange: (length: string) => void;
}

export const ProductSizeSelector = ({ selectedLength, onLengthChange }: ProductSizeSelectorProps) => {
  const lengthOptions = [40, 45, 50, 55, 60, 65, 70, 75, 80];

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-gray-900">Tamanho</Label>
      <div className="flex flex-wrap gap-2">
        {lengthOptions.map((length) => (
          <button
            key={length}
            onClick={() => onLengthChange(length.toString())}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              selectedLength === length.toString()
                ? 'bg-pink-400 text-white border-pink-400'
                : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
            }`}
          >
            {length}cm
          </button>
        ))}
      </div>
    </div>
  );
};
