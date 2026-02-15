import { useCart } from '../context/CartContext';
import { trackAddToCart } from '../utils/fbPixel';

const PRODUCT_ICONS = {
  Stone: '\u26F0\uFE0F',
  Sand: '\u{1F3D6}\uFE0F',
  Gravel: '\u{1FAA8}',
  Mixed: '\u{1F6E4}\uFE0F',
};

function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, 1);
    trackAddToCart(product, 1);
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        {product.image && !product.image.includes('placeholder') ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span>{PRODUCT_ICONS[product.category] || '\u26F0\uFE0F'}</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category} &bull; {product.size}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <div className="product-price">
            KES {Number(product.price_per_ton).toLocaleString()} <span>/ton</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
