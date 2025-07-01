
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShoppingBag, LogOut } from "lucide-react";
import { FavoritesList } from "./FavoritesList";

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
            <div className="space-y-4">
              {user.purchaseHistory.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Pedido #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <Badge variant={order.status === "Entregue" ? "default" : "secondary"}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-700">• {item}</p>
                    ))}
                  </div>
                  <p className="font-bold text-right mt-2">
                    Total: R$ {order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
