
import { Label } from "@/components/ui/label";

interface ProductVolumeSelectorProps {
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
}

export const ProductVolumeSelector = ({ selectedWeight, onWeightChange }: ProductVolumeSelectorProps) => {
  const weightOptions = Array.from({ length: 11 }, (_, i) => 100 + (i * 10));

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-gray-900">Volume (Gramas)</Label>
      <div className="flex flex-wrap gap-2">
        {weightOptions.map((weight) => (
          <button
            key={weight}
            onClick={() => onWeightChange(weight.toString())}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              selectedWeight === weight.toString()
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-brand-medium'
            }`}
          >
            {weight}g
          </button>
        ))}
      </div>
    </div>
  );
};
