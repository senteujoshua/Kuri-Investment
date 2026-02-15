import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustBadges from '../components/TrustBadges';
import DeliveryMap from '../components/DeliveryMap';
import MaterialCalculator from '../components/MaterialCalculator';

function Home() {
  useEffect(() => {
    document.title = 'Stone Crushing Company in Kenya | 3/4 & 3/8 Ballast Suppliers in Nyeri - Kuri Investments';
  }, []);

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
                Leading stone crushing company in Kenya — committed to quality and reliability.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Premium-grade 3/4 and 3/8 aggregates from our own quarry in Kigango, Nyeri',
                  'Certified and quality-tested materials meeting Kenyan construction standards',
                  'Competitive prices for bulk orders with transparent delivery costs in KES',
                  'Same-day delivery within Nyeri and Central Kenya',
                  'Nationwide delivery to Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, and Meru',
                  'Flexible order sizes from 1 ton to full truckloads',
                  'Over 15 years of experience as trusted ballast suppliers in Kenya',
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
