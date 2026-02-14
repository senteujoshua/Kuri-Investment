import { useCart } from '../context/CartContext';

function OrderSummary({ deliveryCost = 0 }) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="order-summary-panel">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '20px' }}>
          Order Summary
        </h2>
        <div className="empty-state">
          <div className="empty-icon">{'\u{1F6D2}'}</div>
          <h3>Your cart is empty</h3>
          <p>Add products from our catalog to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-panel">
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '20px' }}>
        Order Summary
      </h2>

      {items.map((item) => (
        <div className="order-item" key={item.product.id}>
          <div className="order-item-info">
            <h4>{item.product.name}</h4>
            <p>${item.product.price_per_ton}/ton</p>
          </div>
          <div className="order-item-actions">
            <div className="qty-control">
              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}T</span>
              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
            </div>
            <button className="order-remove-btn" onClick={() => removeItem(item.product.id)}>
              {'\u2715'}
            </button>
          </div>
        </div>
      ))}

      <div className="order-total">
        <div className="order-total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="order-total-row">
          <span>Delivery</span>
          <span>{deliveryCost > 0 ? `$${deliveryCost.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="order-total-row grand">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
