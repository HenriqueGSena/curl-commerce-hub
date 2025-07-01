
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLoginSuccess: (userData: any) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login/registro
    const userData = {
      id: 1,
      name: isLogin ? "João Silva" : "Novo Usuário",
      email,
      purchaseHistory: isLogin ? [
        {
          id: 1,
          date: "2024-01-15",
          items: ["Cabelo Natural Liso 60cm"],
          total: 299.90,
          status: "Entregue"
        },
        {
          id: 2,
          date: "2024-02-20",
          items: ["Mega Hair Cacheado 50cm", "Peruca Sintética"],
          total: 349.80,
          status: "Em trânsito"
        }
      ] : []
    };

    onLoginSuccess(userData);
    toast({
      title: isLogin ? "Login realizado!" : "Conta criada!",
      description: `Bem-vindo(a), ${userData.name}!`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {isLogin ? "Entrar" : "Criar Conta"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
