import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../utils/api';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section texture-bg">
      <div className="container">
        <h2 className="section-title">
          Our <span className="section-accent">Products</span>
        </h2>
        <p className="section-subtitle">
          Premium crushed stone, ballast, hardcore, and quarry dust from Kigango, Nyeri
        </p>

        {loading ? (
          <p style={{ color: 'var(--color-gray)' }}>Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/products" className="btn btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
