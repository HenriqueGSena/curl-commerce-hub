
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transforme seu
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {" "}visual
                </span>
                <br />
                com nossos cabelos
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                Descubra nossa coleção premium de cabelos naturais e sintéticos. 
                Qualidade garantida e entrega rápida para todo o Brasil.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/produtos">
                <Button size="lg" className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 text-lg group">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-3 text-lg">
                Saiba Mais
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
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

          <div className="relative">
            <div className="bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl p-8 h-96 lg:h-[500px] flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <div className="text-6xl mb-4">💁‍♀️</div>
                <p className="text-lg">Imagem do produto em destaque</p>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="text-pink-600 font-bold text-lg">
                Frete Grátis
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full p-4 shadow-lg">
              <div className="font-bold text-lg">
                Garantia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
