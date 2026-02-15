function About() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>About <span className="section-accent">Kuri Investments</span></h1>
          <p>Building Kenya&apos;s future with quality construction materials since 2009</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our <span className="section-accent">Story</span></h2>
              <p>
                Kuri Investments has been at the forefront of the quarry and aggregates
                industry for over 15 years. Founded in 2009 and based in Kigango, Nyeri,
                we started with a vision to provide high-quality construction materials
                to builders across Kenya.
              </p>
              <p>
                Our stone crushing plant produces a full range of aggregates including
                3/4 inch (20mm) and 3/8 inch (10mm) crushed stone, ballast, hardcore,
                and quarry dust. Every batch is carefully processed to meet construction
                standards.
              </p>
              <p>
                From small residential projects to large-scale commercial and infrastructure
                developments, we serve contractors, builders, and homeowners across Kenya
                with the same commitment to quality and reliability. Our quarry operations
                are fully licensed and compliant with all Kenyan mining regulations.
              </p>
            </div>
            <div className="about-image">
              {'\u26F0\uFE0F'}
            </div>
          </div>

          <div style={{ marginTop: '60px' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Our <span className="section-accent">Values</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              What drives us every day
            </p>

            <div className="grid grid-3">
              {[
                {
                  icon: '\u{1F48E}',
                  title: 'Quality First',
                  desc: 'Every batch of material is processed and graded to ensure it meets construction standards. We never compromise on quality.',
                },
                {
                  icon: '\u{1F91D}',
                  title: 'Customer Trust',
                  desc: 'We build lasting relationships with our customers through transparency, fair pricing, and reliable delivery across Kenya.',
                },
                {
                  icon: '\u{1F331}',
                  title: 'Sustainability',
                  desc: 'We operate responsibly, rehabilitating quarried land and minimizing our environmental impact in the Nyeri region.',
                },
              ].map((value, idx) => (
                <div key={idx} style={{
                  background: 'var(--color-dark-2)',
                  border: '1px solid var(--color-dark-3)',
                  borderRadius: 'var(--radius)',
                  padding: '30px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{value.icon}</div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>{value.title}</h4>
                  <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', lineHeight: '1.7' }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
