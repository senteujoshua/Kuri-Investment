const API_BASE = '/api';

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

// Reports
export function getMonthlyReport(month) {
  return fetchAPI(`/admin/reports/monthly?month=${month}`);
}
