
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-brand-dark text-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-2 rounded-lg">
                <span className="font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold">HairLux</span>
            </div>
            <p className="text-brand-light text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-brand-light hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-brand-light hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-brand-light hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('header.products')}</a></li>
              <li>
                <button 
                  onClick={() => handleNavigation("/contato")} 
                  className="text-brand-light hover:text-white transition-colors"
                >
                  {t('footer.contact')}
                </button>
              </li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.blog')}</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.customerService')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.returnPolicy')}</a></li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.shipping')}</a></li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-brand-light hover:text-white transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-brand-medium" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-brand-light">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contato@hairlux.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>São Paulo, SP</span>
            </div>
          </div>
          
          <div className="text-sm text-brand-light">
            © 2024 HairLux. {t('footer.allRights')}
          </div>
        </div>
      </div>
    </footer>
  );
};
