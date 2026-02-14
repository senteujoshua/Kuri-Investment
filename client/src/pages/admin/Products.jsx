import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './Dashboard';
import { getAdminProducts, createProduct, updateProduct } from '../../utils/api';

const CATEGORIES = ['Stone', 'Sand', 'Gravel', 'Mixed'];
const SIZES = ['10mm', '20mm', '40mm', '100mm+', 'Dust', 'Fine', 'Coarse', 'Mixed'];

const emptyForm = {
  name: '',
  category: 'Stone',
  size: '20mm',
  use_case: '',
  price_per_ton: '',
  description: '',
  image: '',
  in_stock: true,
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = () => {
    setLoading(true);
    getAdminProducts()
      .then(setProducts)
      .catch(() => navigate('/admin/login'))
      .finally(() => setLoading(false));
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      size: product.size,
      use_case: product.use_case,
      price_per_ton: product.price_per_ton,
      description: product.description || '',
      image: product.image || '',
      in_stock: product.in_stock === 1,
    });
    setEditingId(product.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const data = {
        ...form,
        price_per_ton: parseFloat(form.price_per_ton),
      };

      if (editingId) {
        await updateProduct(editingId, data);
      } else {
        await createProduct(data);
      }

      setShowForm(false);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="products" />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Products</h1>
          <button className="btn btn-primary btn-sm" onClick={openAddForm}>
            + Add Product
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'var(--color-dark-2)',
            border: '1px solid var(--color-orange)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowForm(false)}>Close</button>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius)',
                padding: '12px',
                marginBottom: '16px',
                color: '#ef4444',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Size *
                  </label>
                  <select
                    value={form.size}
                    onChange={(e) => handleChange('size', e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  >
                    {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Price per Ton ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price_per_ton}
                    onChange={(e) => handleChange('price_per_ton', e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Use Case *
                  </label>
                  <input
                    type="text"
                    value={form.use_case}
                    onChange={(e) => handleChange('use_case', e.target.value)}
                    required
                    placeholder="e.g. Foundation, Road, Slab"
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="https://..."
                    style={{
                      width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                      border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                      color: 'var(--color-white)', fontSize: '0.95rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 12px', background: 'var(--color-dark-1)',
                    border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                    color: 'var(--color-white)', fontSize: '0.95rem', resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.in_stock}
                    onChange={(e) => handleChange('in_stock', e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-orange)' }}
                  />
                  <span style={{ color: 'var(--color-gray)' }}>In Stock</span>
                </label>
                <div style={{ flex: 1 }} />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p style={{ color: 'var(--color-gray)' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{'\u{1F4E6}'}</div>
            <h3>No products yet</h3>
            <p>Click &quot;Add Product&quot; to create your first product.</p>
          </div>
        ) : (
          <div className="table-container" style={{
            background: 'var(--color-dark-2)',
            border: '1px solid var(--color-dark-3)',
            borderRadius: 'var(--radius)',
          }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Price/Ton</th>
                  <th>Use Case</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.size}</td>
                    <td>${product.price_per_ton.toFixed(2)}</td>
                    <td>{product.use_case}</td>
                    <td>
                      <span className={`badge ${product.in_stock ? 'badge-confirmed' : 'badge-cancelled'}`}>
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEditForm(product)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
