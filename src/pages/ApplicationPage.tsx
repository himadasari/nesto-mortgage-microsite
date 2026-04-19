import { ProductCard } from '../components/ProductCard/ProductCard';
import type { Product, Applicant } from '../types';
import { useApplication } from '../hooks/useApplication';
import { useUpdateApplication } from '../hooks/useUpdateApplication';
import { useParams } from 'react-router-dom';
import { ApplicationForm } from '../components/ApplicationForm';
import { useProducts } from '../hooks/useProducts';
import { useMemo } from 'react';
import { showError, showInfo, showSuccess } from '../utils/toast';
import { isApplicantComplete } from '../utils/utils';

const ProductSection = ({
  product,
  isLoading,
  isError
}: {
  product?: Product;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <div>Loading product...</div>;
  }
  if (isError) {
    return <div>Failed to load product</div>;
  }

  if (!product) {
    return <div>Product not available</div>;
  }

  return <ProductCard product={product} />;
};

export const ApplicationPage = () => {
    const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useApplication(id!);
  const updateMutation = useUpdateApplication();
  const { data: products, isLoading: isProductLoading, isError: isProductError } = useProducts();

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
                showSuccess("Application Saved");
                } else {
                showInfo("Application saved with incomplete details.");
                }
            },
            onError: () => {
                showError("Failed to save application");
            },
        }
    );
  };

    const product = useMemo(() => products?.find((p) => p.id === data?.productId), [products, data?.productId]);

    if (!id) {
        return <div>Invalid application</div>;
    }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;
  if (!data) return <div>Application not found</div>;

    return (<>
        <h3>Application Details</h3>
        <div className="application-page">
            <ProductSection product={product} isLoading={isProductLoading} isError={isProductError}/>
            <div className="vertical-separator" />
            <ApplicationForm
                initialData={data.applicants?.[0]}
                onSubmit={handleSubmit}
                isLoading={updateMutation.isPending}
            />
        </div>
    </>);
};