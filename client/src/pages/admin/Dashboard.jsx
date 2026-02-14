import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminStats } from '../../utils/api';

function AdminSidebar({ active }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <h2><span style={{ color: 'var(--color-orange)' }}>KURI</span></h2>
      <span className="admin-tag">Admin Panel</span>
      <nav>
        <ul className="admin-nav">
          <li>
            <Link to="/admin/dashboard" className={active === 'dashboard' ? 'active' : ''}>
              {'\u{1F4CA}'} Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className={active === 'orders' ? 'active' : ''}>
              {'\u{1F4E6}'} Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className={active === 'products' ? 'active' : ''}>
              {'\u{1F3D7}\uFE0F'} Products
            </Link>
          </li>
          <li>
            <Link to="/admin/customers" className={active === 'customers' ? 'active' : ''}>
              {'\u{1F465}'} Customers
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className={active === 'reports' ? 'active' : ''}>
              {'\u{1F4C4}'} Reports
            </Link>
          </li>
          <li>
            <Link to="/" style={{ color: 'var(--color-gray)' }}>
              {'\u{1F310}'} View Site
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout} style={{ color: 'var(--color-gray)' }}>
              {'\u{1F6AA}'} Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
      return;
    }
    getAdminStats()
      .then(setStats)
      .catch(() => navigate('/admin/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar active="dashboard" />
        <div className="admin-content">
          <p style={{ color: 'var(--color-gray)', padding: '40px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar active="dashboard" />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--color-gray)' }}>
            Welcome back, {localStorage.getItem('admin_user')}
          </p>
        </div>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-label">Total Orders</div>
            <div className="stat-value">{stats?.totalOrders || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">${(stats?.totalRevenue || 0).toFixed(0)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending Orders</div>
            <div className="stat-value">{stats?.pendingOrders || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Customers</div>
            <div className="stat-value">{stats?.totalCustomers || 0}</div>
          </div>
        </div>

        <div style={{
          background: 'var(--color-dark-2)',
          border: '1px solid var(--color-dark-3)',
          borderRadius: 'var(--radius)',
          padding: '24px',
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Recent Orders</h3>
          {stats?.recentOrders?.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer_name}</td>
                      <td>${order.total_cost.toFixed(2)}</td>
                      <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--color-gray)' }}>No orders yet. They&apos;ll appear here when customers place orders.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { AdminSidebar };
export default Dashboard;
