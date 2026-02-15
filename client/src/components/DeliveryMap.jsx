function DeliveryMap() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          Delivery <span className="section-accent">Coverage</span>
        </h2>
        <p className="section-subtitle">
          We deliver nationwide across Kenya from our quarry in Kigango, Nyeri.
          Contact us for delivery rates to your location.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { area: 'Nyeri & Central Kenya', distance: 'Local', time: 'Same Day' },
            { area: 'Nairobi & Environs', distance: '~150km', time: '1-2 Days' },
            { area: 'Nakuru & Rift Valley', distance: '~200km', time: '1-2 Days' },
            { area: 'Mombasa & Coast', distance: '~500km', time: '2-3 Days' },
            { area: 'Kisumu & Western', distance: '~400km', time: '2-3 Days' },
            { area: 'Eldoret & North Rift', distance: '~300km', time: '2-3 Days' },
          ].map((zone, idx) => (
            <div key={idx} style={{
              background: 'var(--color-dark-2)',
              border: '1px solid var(--color-dark-3)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              textAlign: 'center',
            }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>{zone.area}</h4>
              <p style={{ color: 'var(--color-orange)', fontWeight: '600', marginBottom: '4px' }}>{zone.distance}</p>
              <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem' }}>{zone.time} Delivery</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeliveryMap;
