import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './Dashboard';
import { getCustomers } from '../../utils/api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
      return;
    }
    getCustomers()
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => navigate('/admin/login'));
  }, [navigate]);

  const handleExportCSV = async () => {
    try {
      const csv = await getCustomers('csv');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export: ' + err.message);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="customers" />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Customers</h1>
          <button className="btn btn-primary btn-sm" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-gray)' }}>Loading customers...</p>
        ) : customers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{'\u{1F465}'}</div>
            <h3>No customers yet</h3>
            <p>Customer data will appear here after orders are placed.</p>
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
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={idx}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email || '-'}</td>
                    <td>{customer.total_orders}</td>
                    <td>KES {(customer.total_spent || 0).toLocaleString()}</td>
                    <td>{new Date(customer.last_order).toLocaleDateString()}</td>
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

export default Customers;
