import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">Premium Construction Materials</span>
          <h1>
            Quality <span className="accent">Quarry Aggregates</span> Delivered to Your Site
          </h1>
          <p>
            From crushed stone to building sand, we supply the construction materials
            that build Zimbabwe. Order online, get instant delivery quotes, and track
            your order in real time.
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
