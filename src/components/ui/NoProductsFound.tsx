
import { useTranslation } from "react-i18next";

export const NoProductsFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {t('products.noProducts')}
      </p>
    </div>
  );
};
