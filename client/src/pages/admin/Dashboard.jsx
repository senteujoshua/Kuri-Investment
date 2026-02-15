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

  const iconStyle = { width: 18, height: 18, flexShrink: 0 };

  return (
    <aside className="admin-sidebar">
      <h2><span style={{ color: 'var(--color-orange)' }}>KURI</span></h2>
      <span className="admin-tag">Admin Panel</span>
      <nav>
        <ul className="admin-nav">
          <li>
            <Link to="/admin/dashboard" className={active === 'dashboard' ? 'active' : ''}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="4" /><rect x="14" y="10" width="7" height="11" /><rect x="3" y="13" width="7" height="8" /></svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className={active === 'orders' ? 'active' : ''}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className={active === 'products' ? 'active' : ''}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-4h6v4" /></svg>
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/customers" className={active === 'customers' ? 'active' : ''}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              Customers
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className={active === 'reports' ? 'active' : ''}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/" style={{ color: 'var(--color-gray)' }}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              View Site
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout} style={{ color: 'var(--color-gray)' }}>
              <svg {...iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
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
            <div className="stat-value">KES {(stats?.totalRevenue || 0).toLocaleString()}</div>
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
                      <td>KES {order.total_cost.toLocaleString()}</td>
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
