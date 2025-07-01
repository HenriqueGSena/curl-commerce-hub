
import { useState } from "react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { t } = useTranslation();
  
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100/50 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              HairLux
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('header.home')}
            </Link>
            <Link to="/produtos" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('header.products')}
            </Link>
            <Link to="/sobre" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('header.about')}
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/perfil">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            
            <Link to="/carrinho">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
                {t('header.home')}
              </Link>
              <Link to="/produtos" className="text-gray-700 hover:text-pink-600 transition-colors">
                {t('header.products')}
              </Link>
              <Link to="/sobre" className="text-gray-700 hover:text-pink-600 transition-colors">
                {t('header.about')}
              </Link>
              <Link to="/perfil" className="text-gray-700 hover:text-pink-600 transition-colors">
                Perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
