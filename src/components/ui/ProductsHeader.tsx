
import { useTranslation } from "react-i18next";

interface ProductsHeaderProps {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

export const ProductsHeader = ({ totalProducts, currentPage, totalPages }: ProductsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {t('products.title')}
      </h1>
      <p className="text-xl text-gray-600">
        {t('products.subtitle')}
      </p>
    </div>
  );
};
