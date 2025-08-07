
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShoppingBag, LogOut } from "lucide-react";
import { FavoritesList } from "./FavoritesList";
import { GenericCard } from "@/components/ui/GenericCard";

interface UserData {
  id: number;
  name: string;
  email: string;
  purchaseHistory: Array<{
    id: number;
    date: string;
    items: string[];
    total: number;
    status: string;
  }>;
}

interface UserProfileProps {
  user: UserData;
  onLogout: () => void;
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-3 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </CardHeader>
      </Card>

      <FavoritesList />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Histórico de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.purchaseHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma compra realizada ainda
            </p>
          ) : (
            <div className="grid gap-4">
              {user.purchaseHistory.map((order) => {
                // Simulando imagens para os produtos do pedido
                const orderImages = [
                  "/placeholder.svg",
                  "/placeholder.svg", 
                  "/placeholder.svg"
                ].slice(0, Math.min(order.items.length, 3));

                const cardData = {
                  id: order.id.toString(),
                  title: `Pedido #${order.id}`,
                  subtitle: order.date,
                  price: order.total,
                  images: orderImages,
                  category: order.status,
                  badge: {
                    text: order.status,
                    variant: (order.status === "Entregue" ? "default" : "secondary") as "default" | "secondary" | "destructive" | "outline"
                  },
                  description: order.items.join(" • ")
                };

                return (
                  <GenericCard
                    key={order.id}
                    data={cardData}
                    variant="content"
                    size="sm"
                    showActions={false}
                    showRating={false}
                    className="w-full"
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
