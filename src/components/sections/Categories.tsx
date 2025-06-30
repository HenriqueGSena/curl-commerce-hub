
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Cabelos Naturais",
    description: "100% naturais e de alta qualidade",
    icon: "🌿",
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 2,
    name: "Cabelos Sintéticos",
    description: "Resistentes e com ótimo custo-benefício",
    icon: "✨",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    name: "Mega Hair",
    description: "Para alongamentos e volumes incríveis",
    icon: "💫",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 4,
    name: "Perucas",
    description: "Perucas modernas e estilosas",
    icon: "👸",
    color: "from-rose-400 to-pink-500"
  }
];

export const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Nossas Categorias
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre exatamente o que você procura em nossa ampla seleção de produtos
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-pink-100 hover:border-pink-200">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <Button variant="outline" size="sm" className="border-pink-300 text-pink-700 hover:bg-pink-50 group-hover:bg-pink-100">
                  Ver Produtos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
