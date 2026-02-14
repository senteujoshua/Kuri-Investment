import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustBadges from '../components/TrustBadges';
import DeliveryMap from '../components/DeliveryMap';
import MaterialCalculator from '../components/MaterialCalculator';

function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />

      <section className="section">
        <div className="container">
          <div className="grid-2-col-xl">
            <div>
              <h2 className="section-title">
                Calculate Your <span className="section-accent">Materials</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '20px' }}>
                Not sure how much you need? Use our calculator to estimate the right amount for your project.
              </p>
              <MaterialCalculator />
            </div>
            <div>
              <h2 className="section-title">
                Why Choose <span className="section-accent">Kuri?</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '20px' }}>
                We are committed to quality and reliability.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Consistent quality aggregates from our own quarry',
                  'Competitive pricing with transparent delivery costs',
                  'Same-day delivery within Harare',
                  'Flexible order sizes from 1 ton to full truckloads',
                  'Dedicated customer support via WhatsApp',
                  'Trusted by major construction companies',
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    gap: '12px',
                    color: 'var(--color-gray-light)',
                    fontSize: '0.95rem',
                  }}>
                    <span style={{ color: 'var(--color-orange)', fontWeight: 'bold' }}>{'\u2713'}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DeliveryMap />
    </>
  );
}

export default Home;
