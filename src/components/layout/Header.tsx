
import { useState } from "react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-brand-light/50 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNavigation("/")} className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-2 rounded-lg">
              <span className="font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text text-transparent">
              HairLux
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation("/")} className="text-gray-700 hover:text-brand-primary transition-colors">
              {t('header.home')}
            </button>
            <button onClick={() => handleNavigation("/produtos")} className="text-gray-700 hover:text-brand-primary transition-colors">
              {t('header.products')}
            </button>
            <button onClick={() => handleNavigation("/sobre")} className="text-gray-700 hover:text-brand-primary transition-colors">
              {t('header.about')}
            </button>
            <button onClick={() => handleNavigation("/contato")} className="text-gray-700 hover:text-brand-primary transition-colors">
              Contato
            </button>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => handleNavigation("/perfil")}>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </button>
            
            <button onClick={() => handleNavigation("/carrinho")}>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => handleNavigation("/")} 
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-primary hover:bg-brand-light/20 rounded-lg transition-colors"
              >
                {t('header.home')}
              </button>
              <button 
                onClick={() => handleNavigation("/produtos")} 
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-primary hover:bg-brand-light/20 rounded-lg transition-colors"
              >
                {t('header.products')}
              </button>
              <button 
                onClick={() => handleNavigation("/sobre")} 
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-primary hover:bg-brand-light/20 rounded-lg transition-colors"
              >
                {t('header.about')}
              </button>
              <button 
                onClick={() => handleNavigation("/contato")} 
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-primary hover:bg-brand-light/20 rounded-lg transition-colors"
              >
                Contato
              </button>
              <button 
                onClick={() => handleNavigation("/perfil")} 
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-primary hover:bg-brand-light/20 rounded-lg transition-colors"
              >
                Perfil
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
