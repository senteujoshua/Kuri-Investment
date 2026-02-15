import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">Stone Crushing Company in Kenya &mdash; Kigango, Nyeri</span>
          <h1>
            Your Trusted <span className="accent">Stone Crushing Company</span> in Kenya
          </h1>
          <p>
            Quality 3/4 &amp; 3/8 ballast, hardcore, and quarry dust &mdash; delivered from
            Kigango, Nyeri. Kuri Investments is a leading supplier of crushed stone aggregates
            for construction projects across Kenya. Order online and get fast delivery nationwide.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-lg">
              View Products
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Get a Quote
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>50K+</h3>
              <p>Tons Delivered</p>
            </div>
            <div className="hero-stat">
              <h3>200+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="hero-stat">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div className="hero-stat">
              <h3>24hr</h3>
              <p>Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
