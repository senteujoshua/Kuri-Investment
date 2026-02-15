import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './Dashboard';
import { getAdminOrders, updateOrderStatus, getAdminOrder } from '../../utils/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
      return;
    }
    loadOrders();
  }, [statusFilter, navigate]);

  const loadOrders = () => {
    setLoading(true);
    const params = {};
    if (statusFilter) params.status = statusFilter;
    getAdminOrders(params)
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(() => navigate('/admin/login'));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      loadOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        const updated = await getAdminOrder(orderId);
        setSelectedOrder(updated);
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const order = await getAdminOrder(orderId);
      setSelectedOrder(order);
    } catch (err) {
      alert('Failed to load order details');
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar active="orders" />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Orders</h1>
          <div className="flex-wrap-gap">
            {['', 'pending', 'confirmed', 'processing', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatusFilter(status)}
              >
                {status || 'All'}
              </button>
            ))}
          </div>
        </div>

        {selectedOrder && (
          <div style={{
            background: 'var(--color-dark-2)',
            border: '1px solid var(--color-orange)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>Order #{selectedOrder.id}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>

            <div className="grid-2-col" style={{ gap: '20px', marginBottom: '20px' }}>
              <div>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem' }}>Customer</p>
                <p>{selectedOrder.customer_name}</p>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>{selectedOrder.customer_phone}</p>
                {selectedOrder.customer_email && (
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>{selectedOrder.customer_email}</p>
                )}
              </div>
              <div>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem' }}>Delivery</p>
                <p>{selectedOrder.delivery_address || 'Pickup'}</p>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem' }}>Cost: KES {Number(selectedOrder.delivery_cost).toLocaleString()}</p>
              </div>
            </div>

            {selectedOrder.items && (
              <div className="table-container" style={{ marginBottom: '16px' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product_name}</td>
                        <td>{item.quantity_tons}T</td>
                        <td>KES {Number(item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex-wrap-gap" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--color-gray)' }}>Total: </span>
                <strong style={{ color: 'var(--color-orange)', fontSize: '1.2rem' }}>KES {selectedOrder.total_cost.toLocaleString()}</strong>
              </div>
              <div className="flex-wrap-gap">
                {['pending', 'confirmed', 'processing', 'delivered', 'cancelled'].map((s) => (
                  <button
                    key={s}
                    className={`btn btn-sm ${selectedOrder.status === s ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleStatusChange(selectedOrder.id, s)}
                    disabled={selectedOrder.status === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p style={{ color: 'var(--color-gray)' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{'\u{1F4E6}'}</div>
            <h3>No orders found</h3>
            <p>Orders will appear here when customers place them.</p>
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
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td>KES {order.total_cost.toLocaleString()}</td>
                    <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary" onClick={() => viewOrder(order.id)}>
                        View
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

export default AdminOrders;
