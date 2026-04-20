import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { useProducts } from '../hooks/useProducts';
import { getBestProducts } from '../utils/utils';
import { translations } from '../i18/translations';
import { useLanguage } from '../hooks/useLanguage';
import PageState from '../components/PageState';

export default function ProductsPage() {
  const { data, isLoading, isError } = useProducts();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateApplication();
  const { language } = useLanguage();
  const t = translations[language];

  const { variable, fixed } = getBestProducts(data || []);
  const handleSelect = (productId: number) => {
    mutate(productId, {
      onSuccess: (data) => {
        navigate(`/application/${data.id}`);
      },
    });
  };

  return (
    <div className="products-page">
      <h1 className="page-header">{t.products}</h1>
      <div className="products">
        {isLoading && <PageState message="Loading Products..." />}
        {isError && (
          <PageState message="Failed to load products" type="error" />
        )}
        {!isLoading && !isError && data && data.length === 0 && (
          <PageState message="No products available" />
        )}
        {!isLoading && !isError && data && data.length > 0 && (
          <>
            <section className="products__section">
              <h3 className="products__title">Best VAriable</h3>
              <div className="products__list">
                {variable.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => !isPending && handleSelect(product.id)}
                  />
                ))}
              </div>
            </section>
            <section className="products__section">
              <h3 className="products__title">Best Fixed</h3>
              <div className="products__list">
                {fixed.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => !isPending && handleSelect(product.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
