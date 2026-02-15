import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import { createOrder } from '../utils/api';
import { calculateDeliveryCost, DELIVERY_LOCATIONS, TRUCK_SIZES } from '../utils/deliveryCalc';
import { trackInitiateCheckout, trackPurchase } from '../utils/fbPixel';

function Order() {
  const { items, getSubtotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [includeDelivery, setIncludeDelivery] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customDistance, setCustomDistance] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const location = DELIVERY_LOCATIONS.find((l) => l.name === selectedLocation);
  const isCustom = location && location.distance === -1;
  const distanceKm = isCustom ? Number(customDistance) || 0 : (location ? location.distance : 0);
  const deliveryCost = includeDelivery ? calculateDeliveryCost(distanceKm) : 0;
  const deliveryLocationName = includeDelivery ? (selectedLocation || '') : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Please add at least one product to your order.');
      return;
    }
    if (!name || !phone) {
      setError('Please fill in your name and phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    trackInitiateCheckout(
      items.map((i) => ({ product_id: i.product.id })),
      getSubtotal() + deliveryCost
    );

    try {
      const orderData = {
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: includeDelivery ? address : 'Self Pickup - Kigango Quarry',
        delivery_cost: deliveryCost,
        notes,
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity_tons: item.quantity,
        })),
      };

      const result = await createOrder(orderData);
      trackPurchase(result.order.id, result.order.total_cost);
      setSuccess(result);
      clearCart();
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container">
        <div className="success-page">
          <div className="success-icon">{'\u2705'}</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Your order #{success.order.id} has been received. We&apos;ll contact you
            shortly to confirm details and delivery.
          </p>
          <div className="success-actions">
            <a
              href={success.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Confirm via WhatsApp
            </a>
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <div className="page-header" style={{ marginBottom: '30px' }}>
          <h1>Place Your <span className="section-accent">Order</span></h1>
          <p style={{ color: 'var(--color-gray)' }}>
            {items.length === 0
              ? 'Your cart is empty. Browse our products to add items.'
              : 'Review your order and fill in delivery details below.'}
          </p>
        </div>

        <div className="order-layout">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="order-form-section" style={{ marginBottom: '24px' }}>
                <h2>Customer Information</h2>
                {error && (
                  <div className="login-error" style={{ marginBottom: '16px' }}>{error}</div>
                )}
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email (optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="order-form-section" style={{ marginBottom: '24px' }}>
                <h2>Delivery Details</h2>

                <label className="delivery-toggle">
                  <input
                    type="checkbox"
                    checked={includeDelivery}
                    onChange={(e) => setIncludeDelivery(e.target.checked)}
                  />
                  <span>Include delivery</span>
                  <span className="toggle-hint">
                    {includeDelivery ? 'KES 450/km' : 'Self pickup at Kigango quarry'}
                  </span>
                </label>

                {includeDelivery && (
                  <>
                    <div className="form-group">
                      <label>Delivery Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => {
                          setSelectedLocation(e.target.value);
                          setCustomDistance('');
                        }}
                      >
                        <option value="">-- Select location --</option>
                        {DELIVERY_LOCATIONS.map((loc) => (
                          <option key={loc.name} value={loc.name}>
                            {loc.name}{loc.distance > 0 ? ` (~${loc.distance} km)` : loc.distance === 0 ? ' (Free)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isCustom && (
                      <div className="form-group">
                        <label>Distance from Kigango (km)</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="Enter distance in km"
                          value={customDistance}
                          onChange={(e) => setCustomDistance(e.target.value)}
                        />
                      </div>
                    )}

                    {deliveryCost > 0 && (
                      <div className="delivery-fee-preview">
                        Delivery fee: KES {deliveryCost.toLocaleString()} ({distanceKm} km x KES 450/km)
                      </div>
                    )}

                    {selectedLocation && distanceKm === 0 && (
                      <div className="delivery-fee-preview">
                        Free local delivery within Kigango / Nyeri area
                      </div>
                    )}

                    <div className="form-group" style={{ marginTop: '16px' }}>
                      <label>Delivery Address</label>
                      <input
                        type="text"
                        placeholder="Enter delivery address or site location"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Preferred Truck Size</label>
                  <div className="truck-selector">
                    {TRUCK_SIZES.map((truck) => (
                      <div key={truck.label} className="truck-option">
                        {truck.label} ({truck.tons}T)
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    placeholder="Any special instructions for delivery..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                disabled={submitting || items.length === 0}
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <OrderSummary deliveryCost={deliveryCost} deliveryLocationName={deliveryLocationName} />
        </div>

        {items.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
