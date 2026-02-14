function DeliveryMap() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          Delivery <span className="section-accent">Coverage</span>
        </h2>
        <p className="section-subtitle">
          We deliver across Harare and surrounding areas. Free delivery within 5km of our quarry.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { area: 'Harare CBD', distance: '~15km', time: 'Same Day' },
            { area: 'Chitungwiza', distance: '~25km', time: 'Same Day' },
            { area: 'Norton', distance: '~40km', time: 'Same Day' },
            { area: 'Ruwa', distance: '~20km', time: 'Same Day' },
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
