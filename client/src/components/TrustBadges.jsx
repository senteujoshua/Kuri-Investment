function TrustBadges() {
  const badges = [
    {
      icon: '\u{1F3C6}',
      title: 'Licensed Quarry',
      description: 'Fully licensed stone crushing company in Kigango, Nyeri — compliant with all Kenyan mining regulations',
    },
    {
      icon: '\u2705',
      title: 'Quality Certified',
      description: 'Premium-grade 3/4 and 3/8 aggregates tested and certified to meet Kenyan construction standards',
    },
    {
      icon: '\u{1F4AA}',
      title: '15+ Years Experience',
      description: 'Trusted ballast and aggregate suppliers serving contractors and builders across Kenya since 2009',
    },
    {
      icon: '\u{1F69A}',
      title: 'Nationwide Delivery',
      description: 'Reliable aggregate delivery to Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Meru, and all of Kenya',
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
