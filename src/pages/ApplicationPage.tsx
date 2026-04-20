import ProductCard from '../components/ProductCard/ProductCard';
import type { Product, Applicant } from '../types';
import { useApplication } from '../hooks/useApplication';
import { useUpdateApplication } from '../hooks/useUpdateApplication';
import { useParams } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm/ApplicationForm';
import { useProducts } from '../hooks/useProducts';
import { useEffect, useMemo, useRef } from 'react';
import { showError, showInfo, showSuccess } from '../utils/toast';
import { isApplicantComplete } from '../utils/utils';
import { translations } from '../i18/translations';
import { useLanguage } from '../hooks/useLanguage';
import PageState from '../components/PageState';

const ProductSection = ({
  product,
  isLoading,
  isError,
}: {
  product?: Product;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <PageState message="Loading product..." />;
  }
  if (isError) {
    return <PageState message="Failed to load product" type="error" />;
  }

  if (!product) {
    return <PageState message="Product not available" />;
  }

  return <ProductCard product={product} />;
};

export const ApplicationPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useApplication(id!);
  const updateMutation = useUpdateApplication();
  const {
    data: products,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProducts();
  const { language } = useLanguage();
  const t = translations[language];

  const hasShownToast = useRef(false);

  useEffect(() => {
    const applicant = data?.applicants?.[0];

    if (
      applicant &&
      !isApplicantComplete(applicant) &&
      !hasShownToast.current
    ) {
      showInfo('New application created. Please fill in details.');
      hasShownToast.current = true;
    }
  }, [data]);

  const handleSubmit = (applicant: Applicant) => {
    updateMutation.mutate(
      {
        id: id!,
        data: {
          applicants: [applicant],
        },
      },
      {
        onSuccess: () => {
          if (isApplicantComplete(applicant)) {
            showSuccess('Application Saved');
          } else {
            showInfo('Application saved with incomplete details.');
          }
        },
        onError: () => {
          showError('Failed to save application');
        },
      },
    );
  };

  const product = useMemo(
    () => products?.find((p) => p.id === data?.productId),
    [products, data?.productId],
  );

  if (!id) {
    return <div>Invalid application</div>;
  }

  return (
    <>
      <h1 className="page-header">{t.applicationsDetails}</h1>
      <div className="application-page">
        {isLoading && <PageState message="Loading applications..." />}
        {isError && (
          <PageState message="Failed to load application" type="error" />
        )}
        {!data && <PageState message="Application not found" />}
        {!isLoading && !isError && data && (
          <>
            <ProductSection
              product={product}
              isLoading={isProductLoading}
              isError={isProductError}
            />
            <div className="vertical-separator" />
            <ApplicationForm
              initialData={data.applicants?.[0]}
              onSubmit={handleSubmit}
              isLoading={updateMutation.isPending}
            />
          </>
        )}
      </div>
    </>
  );
};
