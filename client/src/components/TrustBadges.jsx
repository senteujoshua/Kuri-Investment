function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'Licensed Quarry',
      description: 'Fully licensed and compliant with all Kenyan mining and environmental regulations',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
      title: 'Quality Certified',
      description: 'Aggregates tested and certified to meet Kenyan construction and engineering standards',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      ),
      title: '15+ Years Experience',
      description: 'Trusted aggregate suppliers serving contractors and builders across Kenya since 2009',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: 'Nationwide Delivery',
      description: 'Reliable delivery to Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all of Kenya',
    },
  ];

  return (
    <section className="trust-badges section">
      <div className="container">
        <div className="trust-header">
          <h2 className="section-title">
            Why Choose <span className="section-accent">Kuri</span>
          </h2>
          <p className="section-subtitle">
            The trusted name in quality aggregates and reliable delivery
          </p>
        </div>
        <div className="trust-grid">
          {badges.map((badge, idx) => (
            <div className="trust-item" key={idx}>
              <div className="trust-icon-wrap">
                {badge.icon}
              </div>
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
