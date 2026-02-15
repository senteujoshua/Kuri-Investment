function DeliveryMap() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          Nationwide Ballast &amp; Aggregate <span className="section-accent">Delivery</span>
        </h2>
        <p className="section-subtitle">
          We deliver 3/4, 3/8 aggregates, ballast, hardcore, and quarry dust across Kenya
          from our stone crushing plant in Kigango, Nyeri. Contact us for delivery rates to your location.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { area: 'Nyeri, Karatina & Central Kenya', distance: 'Local', time: 'Same Day' },
            { area: 'Nairobi, Thika & Environs', distance: '~150km', time: '1-2 Days' },
            { area: 'Nakuru, Naivasha & Rift Valley', distance: '~200km', time: '1-2 Days' },
            { area: 'Meru, Embu & Eastern', distance: '~150km', time: '1-2 Days' },
            { area: 'Mombasa & Coast Region', distance: '~500km', time: '2-3 Days' },
            { area: 'Kisumu, Eldoret & Western Kenya', distance: '~400km', time: '2-3 Days' },
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

        <p style={{
          textAlign: 'center',
          color: 'var(--color-gray)',
          fontSize: '0.85rem',
          marginTop: '20px',
          lineHeight: '1.7',
        }}>
          Serving: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Nyeri, Thika, Meru, Embu, Karatina,
          Naivasha, Nanyuki, Kiambu, Machakos, Kitui, Garissa, Malindi, and more towns across Kenya
        </p>
      </div>
    </section>
  );
}

export default DeliveryMap;
