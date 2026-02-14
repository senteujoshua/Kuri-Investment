import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './Dashboard';
import { getMonthlyReport } from '../../utils/api';
import { downloadReport } from '../../utils/pdfReport';

function Reports() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setReport(null);
    try {
      const data = await getMonthlyReport(month);
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (report) {
      downloadReport(report);
    }
  };

  const formatMonth = (m) => {
    const [year, mon] = m.split('-');
    const date = new Date(year, parseInt(mon) - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="reports" />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Monthly Reports</h1>
        </div>

        {/* Controls */}
        <div className="flex-wrap-gap" style={{
          background: 'var(--color-dark-2)',
          border: '1px solid var(--color-dark-3)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          marginBottom: '24px',
          alignItems: 'center',
        }}>
          <div>
            <label style={{ display: 'block', color: 'var(--color-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>
              Select Month
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                padding: '10px 12px', background: 'var(--color-dark-1)',
                border: '1px solid var(--color-dark-3)', borderRadius: 'var(--radius)',
                color: 'var(--color-white)', fontSize: '0.95rem',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
            <button className="btn btn-primary btn-sm" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
            {report && (
              <button className="btn btn-sm" onClick={handleDownload} style={{
                background: '#16a34a', color: 'white', border: 'none',
                padding: '8px 16px', borderRadius: 'var(--radius)', cursor: 'pointer',
                fontWeight: 600,
              }}>
                Download PDF
              </button>
            )}
          </div>
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

        {/* Report Preview */}
        {report && (
          <>
            {/* Revenue Cards */}
            <div className="stat-cards" style={{ marginBottom: '24px' }}>
              <div className="stat-card">
                <div className="stat-label">Revenue</div>
                <div className="stat-value">${report.revenue.totalRevenue.toFixed(2)}</div>
                {report.previousMonth.totalOrders > 0 && (
                  <div style={{ color: 'var(--color-gray)', fontSize: '0.8rem', marginTop: '4px' }}>
                    vs ${report.previousMonth.totalRevenue.toFixed(2)} prev
                  </div>
                )}
              </div>
              <div className="stat-card">
                <div className="stat-label">Orders</div>
                <div className="stat-value">{report.revenue.totalOrders}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Avg Order</div>
                <div className="stat-value">${report.revenue.avgOrderValue.toFixed(2)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Customers</div>
                <div className="stat-value">{report.customers.total}</div>
              </div>
            </div>

            {/* Orders by Status */}
            <div className="grid-2-col-lg" style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
                padding: '20px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>Orders by Status</h3>
                {report.ordersByStatus.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {report.ordersByStatus.map((s) => (
                      <div key={s.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`badge badge-${s.status}`}>{s.status}</span>
                        <strong>{s.count}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-gray)' }}>No orders this month.</p>
                )}
              </div>

              <div style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
                padding: '20px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>Top Customers</h3>
                {report.customers.topCustomers.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {report.customers.topCustomers.map((c, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div>{c.name}</div>
                          <div style={{ color: 'var(--color-gray)', fontSize: '0.8rem' }}>{c.orders} orders</div>
                        </div>
                        <strong style={{ color: 'var(--color-orange)' }}>${c.total_spent.toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-gray)' }}>No customers this month.</p>
                )}
              </div>
            </div>

            {/* Top Products */}
            {report.topProducts.length > 0 && (
              <div style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
                marginBottom: '24px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', padding: '20px 20px 0' }}>Top Products</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Tons Sold</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.topProducts.map((p, i) => (
                        <tr key={i}>
                          <td>{p.name}</td>
                          <td>{p.category}</td>
                          <td>{p.tons_sold.toFixed(1)}T</td>
                          <td style={{ color: 'var(--color-orange)' }}>${p.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders List */}
            {report.orders.length > 0 && (
              <div style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', padding: '20px 20px 0' }}>
                  All Orders - {formatMonth(report.month)}
                </h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.customer_name}</td>
                          <td>{order.customer_phone}</td>
                          <td>${order.total_cost.toFixed(2)}</td>
                          <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {!report && !loading && (
          <div className="empty-state">
            <div className="empty-icon">{'\u{1F4C4}'}</div>
            <h3>Generate a Report</h3>
            <p>Select a month and click &quot;Generate Report&quot; to view and download your monthly report as PDF.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
