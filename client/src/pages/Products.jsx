import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';

const SIZES = ['All', '10mm', '20mm', '40mm', '100mm+', 'Dust', 'Fine', 'Coarse', 'Mixed'];
const USE_CASES = ['All', 'Foundation', 'Road', 'Slab', 'Finishing', 'Paving', 'Leveling', 'Drainage', 'Landscaping', 'Concrete', 'Retaining Walls'];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedUseCase, setSelectedUseCase] = useState('All');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedSize !== 'All' && p.size !== selectedSize) return false;
    if (selectedUseCase !== 'All' && !p.use_case.includes(selectedUseCase)) return false;
    return true;
  });

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our <span className="section-accent">Products</span></h1>
          <p style={{ color: 'var(--color-gray)' }}>
            Browse our full range of quarry aggregates and construction materials
          </p>
        </div>

        <div className="products-layout">
          <aside className="filter-sidebar">
            <h3>Filters</h3>

            <div className="filter-group">
              <div className="filter-search">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Size</label>
              <div className="filter-options">
                {SIZES.map((size) => (
                  <div
                    key={size}
                    className={`filter-option ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Use Case</label>
              <div className="filter-options">
                {USE_CASES.map((uc) => (
                  <div
                    key={uc}
                    className={`filter-option ${selectedUseCase === uc ? 'active' : ''}`}
                    onClick={() => setSelectedUseCase(uc)}
                  >
                    {uc}
                  </div>
                ))}
              </div>
            </div>

            {(selectedSize !== 'All' || selectedUseCase !== 'All' || search) && (
              <button
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
                onClick={() => {
                  setSelectedSize('All');
                  setSelectedUseCase('All');
                  setSearch('');
                }}
              >
                Clear Filters
              </button>
            )}
          </aside>

          <div>
            {loading ? (
              <p style={{ color: 'var(--color-gray)', padding: '40px 0' }}>Loading products...</p>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">{'\u{1F50D}'}</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--color-gray)', marginBottom: '20px', fontSize: '0.9rem' }}>
                  Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                </p>
                <div className="products-grid">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
