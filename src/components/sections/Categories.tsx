
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "natural",
    description: "naturalDesc",
    icon: "🌿",
    color: "from-green-400 to-emerald-500",
    filter: "naturais"
  },
  {
    id: 2,
    name: "synthetic",
    description: "syntheticDesc",
    icon: "✨",
    color: "from-purple-400 to-pink-500",
    filter: "sinteticos"
  },
  {
    id: 3,
    name: "megaHair",
    description: "megaHairDesc",
    icon: "💫",
    color: "from-blue-400 to-cyan-500",
    filter: "mega-hair"
  },
  {
    id: 4,
    name: "wigs",
    description: "wigsDesc",
    icon: "👸",
    color: "from-rose-400 to-pink-500",
    filter: "perucas"
  }
];

export const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryClick = (filter: string) => {
    navigate(`/produtos?categoria=${filter}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('home.categoriesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.categoriesSubtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-pink-100 hover:border-pink-200 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`categories.${category.name}`)}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t(`categories.${category.description}`)}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-pink-300 text-pink-700 hover:bg-pink-50 group-hover:bg-pink-100"
                  onClick={() => handleCategoryClick(category.filter)}
                >
                  {t('categories.seeProducts')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
