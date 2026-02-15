import { useEffect } from 'react';

function About() {
  useEffect(() => {
    document.title = 'About Kuri Investments | Leading Quarry & Aggregate Supplier in Nyeri, Kenya';
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>About <span className="section-accent">Kuri Investments</span></h1>
          <p>Leading quarry and aggregate supplier in Kigango, Nyeri — building Kenya since 2009</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our <span className="section-accent">Story</span></h2>
              <p>
                Kuri Investments is a leading stone crushing company in Kenya, proudly based
                in Kigango, Nyeri. Since 2009, we have been supplying premium-grade 3/4 and
                3/8 aggregates, ballast, hardcore, and quarry dust to construction projects
                across the country.
              </p>
              <p>
                Our modern stone crushing plant produces a full range of construction aggregates
                — from fine 3/8 inch (10mm) crushed stone for concrete slabs and finishing work,
                to heavy-duty ballast for foundations and road construction. Every batch is
                carefully processed, graded, and tested to meet Kenyan construction standards.
              </p>
              <p>
                From residential builds in Nyeri to large-scale infrastructure projects in Nairobi,
                Mombasa, and beyond, we are trusted ballast and aggregate suppliers serving
                contractors, builders, and homeowners across Kenya. Our quarry operations are
                fully licensed and compliant with all Kenyan mining regulations.
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
                  desc: 'Supplying strong and durable building aggregates — every batch of 3/4 and 3/8 crushed stone is processed and tested to meet construction standards.',
                },
                {
                  icon: '\u{1F91D}',
                  title: 'Customer Trust',
                  desc: 'Offering affordable pricing for bulk aggregate orders across Kenya with transparent delivery costs and reliable service.',
                },
                {
                  icon: '\u{1F331}',
                  title: 'Sustainability',
                  desc: 'Operating responsibly in Kigango, Nyeri — rehabilitating quarried land and minimizing our environmental impact.',
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
