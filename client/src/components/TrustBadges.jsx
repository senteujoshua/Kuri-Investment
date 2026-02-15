function TrustBadges() {
  const badges = [
    {
      icon: '\u{1F3C6}',
      title: 'Licensed Quarry',
      description: 'Fully licensed and compliant with Kenyan mining regulations',
    },
    {
      icon: '\u2705',
      title: 'Quality Certified',
      description: 'Materials tested and certified to meet construction standards',
    },
    {
      icon: '\u{1F4AA}',
      title: '15+ Years Experience',
      description: 'Trusted by contractors and builders across Kenya since 2009',
    },
    {
      icon: '\u{1F69A}',
      title: 'Nationwide Delivery',
      description: 'Reliable delivery across Kenya from our Kigango, Nyeri quarry',
    },
  ];

  return (
    <section className="trust-badges section">
      <div className="container">
        <div className="trust-grid">
          {badges.map((badge, idx) => (
            <div className="trust-item" key={idx}>
              <div className="trust-icon">{badge.icon}</div>
              <h4>{badge.title}</h4>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
