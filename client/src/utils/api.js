const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Resolve image URLs - uploaded images are stored as /uploads/xxx.jpg
// In production, prepend the backend origin so they load from Render
export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already absolute
  if (path.startsWith('/uploads')) {
    // In production, API_BASE is like https://kuri-investment.onrender.com/api
    // We need https://kuri-investment.onrender.com/uploads/...
    const base = API_BASE.replace(/\/api$/, '');
    if (base && base !== '') return `${base}${path}`;
  }
  return path;
}

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  // Add auth token for admin requests
  const token = localStorage.getItem('admin_token');
  if (token && endpoint.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);

  if (response.status === 401 || response.status === 403) {
    if (endpoint.startsWith('/admin')) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Something went wrong');
  }

  // Handle CSV responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/csv')) {
    return response.text();
  }

  return response.json();
}

export function getProducts(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  const query = params.toString();
  return fetchAPI(`/products${query ? `?${query}` : ''}`);
}

export function getProduct(slug) {
  return fetchAPI(`/products/${slug}`);
}

export function createOrder(orderData) {
  return fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export function adminLogin(credentials) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getAdminStats() {
  return fetchAPI('/admin/stats');
}

export function getAdminOrders(params = {}) {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/admin/orders${query ? `?${query}` : ''}`);
}

export function getAdminOrder(id) {
  return fetchAPI(`/admin/orders/${id}`);
}

export function updateOrderStatus(id, data) {
  return fetchAPI(`/admin/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function getCustomers(format) {
  const query = format ? `?format=${format}` : '';
  return fetchAPI(`/admin/customers${query}`);
}

// Admin product management
export function getAdminProducts() {
  return fetchAPI('/admin/products');
}

export function createProduct(data) {
  return fetchAPI('/admin/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateProduct(id, data) {
  return fetchAPI(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Image upload
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
}

// Reports
export function getMonthlyReport(month) {
  return fetchAPI(`/admin/reports/monthly?month=${month}`);
}
