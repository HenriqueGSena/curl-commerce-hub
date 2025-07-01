
import { useTranslation } from "react-i18next";

interface ProductsResultsInfoProps {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

export const ProductsResultsInfo = ({ totalProducts, currentPage, totalPages }: ProductsResultsInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 flex justify-between items-center">
      <p className="text-gray-600">
        {totalProducts} {totalProducts === 1 ? t('products.productsFound') : t('products.productsFoundPlural')}
        {totalPages > 1 && (
          <span className="ml-2 text-sm">
            ({t('products.page')} {currentPage} {t('products.of')} {totalPages})
          </span>
        )}
      </p>
    </div>
  );
};
