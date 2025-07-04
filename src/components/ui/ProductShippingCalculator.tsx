
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ProductShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);

  const calcularFrete = () => {
    if (cep.length === 8) {
      // Simulação de cálculo de frete
      const freteCalculado = Math.floor(Math.random() * 20) + 5;
      setFrete(freteCalculado);
      toast({
        title: "Frete calculado",
        description: `Frete para ${cep}: R$ ${freteCalculado.toFixed(2)}`,
      });
    } else {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido com 8 dígitos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-700">Calcular frete</span>
      </div>
      <div className="flex gap-3">
        <Input
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={calcularFrete}
          className="flex-shrink-0"
        >
          Calcular
        </Button>
      </div>
      {frete && (
        <p className="text-green-600 mt-3 font-medium">
          Frete: R$ {frete.toFixed(2)}
        </p>
      )}
    </div>
  );
};
