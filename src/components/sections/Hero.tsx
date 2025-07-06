
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-brand-light via-brand-light/50 to-brand-light py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transforme seu
              <span className="bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text text-transparent">
                {" "}visual
              </span>
              <br />
              com nossos cabelos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa coleção premium de cabelos naturais e sintéticos. 
              Qualidade garantida e entrega rápida para todo o Brasil.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/produtos">
              <Button size="lg" className="bg-gradient-to-r from-brand-primary to-brand-dark hover:from-brand-secondary hover:to-brand-primary text-white px-8 py-3 text-lg group">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button variant="outline" size="lg" className="border-brand-medium text-brand-dark hover:bg-brand-light px-8 py-3 text-lg">
                Saiba Mais
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-600">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5⭐</div>
              <div className="text-gray-600">Avaliação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
