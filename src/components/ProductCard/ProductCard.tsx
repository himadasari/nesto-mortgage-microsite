import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

const ProductCard = ({ product, onClick } : ProductCardProps ) => {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onClick) {
                    onClick();
                }
            }}
            className="product-card"
        >
            <h6 className="product-card__name">{product.name}</h6>
            <p className="product-card__rate">{product.bestRate}%</p>
            <span className="product-card__action">Select Product</span>
        </div>
    );
};

export default ProductCard;