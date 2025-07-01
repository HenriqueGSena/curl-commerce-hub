
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import { UserProfile } from "@/components/auth/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (userData: any) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {isAuthenticated ? "Meu Perfil" : "Entrar na Conta"}
          </h1>
          <p className="text-xl text-gray-600">
            {isAuthenticated ? "Gerencie sua conta e veja seus favoritos" : "Acesse sua conta para ver seus favoritos e histórico de compras"}
          </p>
        </div>

        {isAuthenticated && user ? (
          <UserProfile user={user} onLogout={handleLogout} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
